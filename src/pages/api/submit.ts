export const prerender = false;

import type { APIRoute } from 'astro';
import { supabase } from '../../lib/supabase';
import { sendConfirmationEmail, sendInternalNotification } from '../../lib/resend';

const BOND_TYPE_OPTIONS = new Set([
  'Court / Fiduciary',
  'Commercial & Licence',
  'Construction',
  'Fidelity / Employee Dishonesty',
  'Mixed / Multi-line',
]);

const VOLUME_OPTIONS = new Set([
  '1–25 bonds/month',
  '26–100 bonds/month',
  '100+ bonds/month',
  'Not sure yet',
]);

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { full_name, work_email, agency_name, bond_types, monthly_volume, workflow_pain } = body as {
    full_name?: string;
    work_email?: string;
    agency_name?: string;
    bond_types?: string[];
    monthly_volume?: string;
    workflow_pain?: string;
  };

  // Validate required fields
  if (
    typeof full_name !== 'string' || full_name.trim().length < 2 ||
    typeof work_email !== 'string' || !isValidEmail(work_email.trim()) ||
    typeof agency_name !== 'string' || agency_name.trim().length < 2 ||
    !Array.isArray(bond_types) || bond_types.length === 0 ||
    typeof monthly_volume !== 'string' || !VOLUME_OPTIONS.has(monthly_volume)
  ) {
    return new Response(JSON.stringify({ error: 'Missing or invalid required fields' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Validate bond_types values
  if (!bond_types.every((bt) => BOND_TYPE_OPTIONS.has(bt))) {
    return new Response(JSON.stringify({ error: 'Invalid bond type selection' }), {
      status: 422,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Insert to Supabase
  const { error: dbError } = await supabase.from('waitlist_signups').insert({
    full_name: full_name.trim(),
    work_email: work_email.trim().toLowerCase(),
    agency_name: agency_name.trim(),
    bond_types,
    monthly_volume,
    workflow_pain: typeof workflow_pain === 'string' ? workflow_pain.trim() || null : null,
  });

  if (dbError) {
    console.error('Supabase insert error:', dbError);
    return new Response(JSON.stringify({ error: 'Failed to save your registration. Please try again.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Send emails (non-blocking — don't fail the response if email fails)
  const [confirmResult, notifyResult] = await Promise.allSettled([
    sendConfirmationEmail({
      name: full_name.trim(),
      email: work_email.trim().toLowerCase(),
      agencyName: agency_name.trim(),
    }),
    sendInternalNotification({
      name: full_name.trim(),
      email: work_email.trim().toLowerCase(),
      agencyName: agency_name.trim(),
      bondTypes: bond_types,
      monthlyVolume: monthly_volume,
      workflowPain: typeof workflow_pain === 'string' ? workflow_pain.trim() : undefined,
    }),
  ]);

  if (confirmResult.status === 'rejected') {
    console.error('[resend] confirmation email failed:', confirmResult.reason);
  } else if (confirmResult.value?.error) {
    console.error('[resend] confirmation email error:', confirmResult.value.error);
  }

  if (notifyResult.status === 'rejected') {
    console.error('[resend] internal notification failed:', notifyResult.reason);
  } else if (notifyResult.value?.error) {
    console.error('[resend] internal notification error:', notifyResult.value.error);
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
