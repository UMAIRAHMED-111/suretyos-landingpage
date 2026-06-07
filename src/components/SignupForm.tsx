import { useState, type FormEvent } from 'react';

const BOND_TYPES = [
  'Court / Fiduciary',
  'Commercial & Licence',
  'Construction',
  'Fidelity / Employee Dishonesty',
  'Mixed / Multi-line',
] as const;

const VOLUME_OPTIONS = [
  '1–25 bonds/month',
  '26–100 bonds/month',
  '100+ bonds/month',
  'Not sure yet',
] as const;

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FormData {
  full_name: string;
  work_email: string;
  agency_name: string;
  bond_types: string[];
  monthly_volume: string;
  workflow_pain: string;
}

function validateEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export default function SignupForm() {
  const [formState, setFormState] = useState<FormState>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [data, setData] = useState<FormData>({
    full_name: '',
    work_email: '',
    agency_name: '',
    bond_types: [],
    monthly_volume: '',
    workflow_pain: '',
  });

  const errors: Partial<Record<keyof FormData, string>> = {};
  if (touched.full_name && data.full_name.trim().length < 2) {
    errors.full_name = 'Please enter your full name.';
  }
  if (touched.work_email && !validateEmail(data.work_email)) {
    errors.work_email = 'Please enter a valid work email address.';
  }
  if (touched.agency_name && data.agency_name.trim().length < 2) {
    errors.agency_name = 'Please enter your agency name.';
  }
  if (touched.bond_types && data.bond_types.length === 0) {
    errors.bond_types = 'Select at least one bond type.';
  }
  if (touched.monthly_volume && !data.monthly_volume) {
    errors.monthly_volume = 'Please select your monthly bond volume.';
  }

  function handleBlur(field: string) {
    setTouched((t) => ({ ...t, [field]: true }));
  }

  function toggleBondType(type: string) {
    setData((d) => ({
      ...d,
      bond_types: d.bond_types.includes(type)
        ? d.bond_types.filter((t) => t !== type)
        : [...d.bond_types, type],
    }));
    setTouched((t) => ({ ...t, bond_types: true }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Mark all fields as touched to show all errors
    const allTouched: Record<string, boolean> = {};
    Object.keys(data).forEach((k) => { allTouched[k] = true; });
    setTouched(allTouched);

    // Client-side guard
    if (
      data.full_name.trim().length < 2 ||
      !validateEmail(data.work_email) ||
      data.agency_name.trim().length < 2 ||
      data.bond_types.length === 0 ||
      !data.monthly_volume
    ) {
      return;
    }

    setFormState('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setFormState('success');
        // track conversion
        if (typeof window !== 'undefined' && (window as any).plausible) {
          (window as any).plausible('Founding Signup');
        }
      } else {
        const body = await res.json().catch(() => ({}));
        setErrorMsg(body.error ?? 'Something went wrong. Please try again.');
        setFormState('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setFormState('error');
    }
  }

  if (formState === 'success') {
    return (
      <div className="form-success" role="status" aria-live="polite">
        <div className="success-icon" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <circle cx="14" cy="14" r="13" fill="#02c39a" fillOpacity="0.12" stroke="#02c39a" strokeWidth="1.5"/>
            <path d="M8 14l4.5 4.5 7.5-8" stroke="#02c39a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="success-title">You're in.</h3>
        <p className="success-body">
          Check your email. We'll be in touch within 48 hours to set up a quick call. You've locked in lifetime founder pricing.
        </p>
      </div>
    );
  }

  const isSubmitting = formState === 'submitting';

  return (
    <form className="signup-form" onSubmit={handleSubmit} noValidate aria-label="Founding agency application">
      {/* Full name */}
      <div className="field-group">
        <label className="field-label" htmlFor="full_name">Full name</label>
        <input
          id="full_name"
          name="full_name"
          type="text"
          className={`field-input${errors.full_name ? ' field-input--error' : ''}`}
          placeholder="Jane Smith"
          autoComplete="name"
          value={data.full_name}
          onChange={(e) => setData((d) => ({ ...d, full_name: e.target.value }))}
          onBlur={() => handleBlur('full_name')}
          aria-describedby={errors.full_name ? 'err-full_name' : undefined}
          aria-invalid={!!errors.full_name}
          required
        />
        {errors.full_name && (
          <p id="err-full_name" className="field-error" role="alert">{errors.full_name}</p>
        )}
      </div>

      {/* Work email */}
      <div className="field-group">
        <label className="field-label" htmlFor="work_email">Work email</label>
        <input
          id="work_email"
          name="work_email"
          type="email"
          className={`field-input${errors.work_email ? ' field-input--error' : ''}`}
          placeholder="jane@youragency.com"
          autoComplete="email"
          inputMode="email"
          value={data.work_email}
          onChange={(e) => setData((d) => ({ ...d, work_email: e.target.value }))}
          onBlur={() => handleBlur('work_email')}
          aria-describedby={errors.work_email ? 'err-work_email' : undefined}
          aria-invalid={!!errors.work_email}
          required
        />
        {errors.work_email && (
          <p id="err-work_email" className="field-error" role="alert">{errors.work_email}</p>
        )}
      </div>

      {/* Agency name */}
      <div className="field-group">
        <label className="field-label" htmlFor="agency_name">Agency name</label>
        <input
          id="agency_name"
          name="agency_name"
          type="text"
          className={`field-input${errors.agency_name ? ' field-input--error' : ''}`}
          placeholder="Acme Surety Associates"
          autoComplete="organization"
          value={data.agency_name}
          onChange={(e) => setData((d) => ({ ...d, agency_name: e.target.value }))}
          onBlur={() => handleBlur('agency_name')}
          aria-describedby={errors.agency_name ? 'err-agency_name' : undefined}
          aria-invalid={!!errors.agency_name}
          required
        />
        {errors.agency_name && (
          <p id="err-agency_name" className="field-error" role="alert">{errors.agency_name}</p>
        )}
      </div>

      {/* Bond types — multi-select pill buttons */}
      <div className="field-group">
        <fieldset className="fieldset-no-border" aria-describedby={errors.bond_types ? 'err-bond_types' : undefined}>
          <legend className="field-label">Bond types you write</legend>
          <div className="pill-group" role="group">
            {BOND_TYPES.map((type) => {
              const selected = data.bond_types.includes(type);
              return (
                <button
                  key={type}
                  type="button"
                  role="checkbox"
                  aria-checked={selected}
                  className={`pill${selected ? ' pill--selected' : ''}`}
                  onClick={() => toggleBondType(type)}
                >
                  {selected && (
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none" aria-hidden="true">
                      <path d="M1 5l3.5 3.5L11 1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                  {type}
                </button>
              );
            })}
          </div>
          {errors.bond_types && (
            <p id="err-bond_types" className="field-error" role="alert">{errors.bond_types}</p>
          )}
        </fieldset>
      </div>

      {/* Monthly volume — radio group */}
      <div className="field-group">
        <fieldset className="fieldset-no-border" aria-describedby={errors.monthly_volume ? 'err-monthly_volume' : undefined}>
          <legend className="field-label">Monthly bond volume</legend>
          <div className="radio-group">
            {VOLUME_OPTIONS.map((opt) => (
              <label key={opt} className="radio-item">
                <input
                  type="radio"
                  name="monthly_volume"
                  value={opt}
                  checked={data.monthly_volume === opt}
                  onChange={() => {
                    setData((d) => ({ ...d, monthly_volume: opt }));
                    setTouched((t) => ({ ...t, monthly_volume: true }));
                  }}
                  className="radio-input"
                />
                <span className="radio-label">{opt}</span>
              </label>
            ))}
          </div>
          {errors.monthly_volume && (
            <p id="err-monthly_volume" className="field-error" role="alert">{errors.monthly_volume}</p>
          )}
        </fieldset>
      </div>

      {/* Optional: workflow pain */}
      <div className="field-group">
        <label className="field-label" htmlFor="workflow_pain">
          What's most painful about your current workflow? <span className="optional-label">(optional)</span>
        </label>
        <textarea
          id="workflow_pain"
          name="workflow_pain"
          className="field-textarea"
          placeholder="E.g., we retype the same client data into 4 different carrier portals every single bond..."
          rows={3}
          value={data.workflow_pain}
          onChange={(e) => setData((d) => ({ ...d, workflow_pain: e.target.value }))}
        />
      </div>

      {/* Server error */}
      {formState === 'error' && (
        <p className="server-error" role="alert">{errorMsg}</p>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-primary-lg submit-btn"
        disabled={isSubmitting}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Submitting…' : 'Claim My Founding Spot'}
      </button>
    </form>
  );
}
