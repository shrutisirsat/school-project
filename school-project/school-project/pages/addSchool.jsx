
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function AddSchool() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data) => {
    try {
      setSubmitting(true);
      const fd = new FormData();
      fd.append('name', data.name);
      fd.append('address', data.address);
      fd.append('city', data.city);
      fd.append('state', data.state);
      fd.append('contact', data.contact);
      fd.append('email_id', data.email_id);
      if (data.image && data.image[0]) {
        fd.append('image', data.image[0]);
      }
      if (data.imageUrl) {
        fd.append('imageUrl', data.imageUrl);
      }

      const res = await fetch('/api/uploadSchool', {
        method: 'POST',
        body: fd,
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || 'Failed');
      setMessage(json.message || 'Saved!');
      reset();
    } catch (e) {
      setMessage(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{maxWidth: 720, margin: '24px auto'}}>
        <h1 style={{marginTop:0}}>Add School</h1>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div className="row">
            <label className="label">School Name</label>
            <input className="input" placeholder="e.g. ABC Public School" {...register('name', { required: true, minLength: 2 })} />
            {errors.name && <small className="sub">Name is required</small>}
          </div>

          <div className="row">
            <label className="label">Address</label>
            <input className="input" placeholder="Address" {...register('address', { required: true })} />
          </div>

          <div className="row row--2">
            <div>
              <label className="label">City</label>
              <input className="input" placeholder="City" {...register('city', { required: true })} />
            </div>
            <div>
              <label className="label">State</label>
              <input className="input" placeholder="State" {...register('state', { required: true })} />
            </div>
          </div>

          <div className="row row--2">
            <div>
              <label className="label">Contact Number</label>
              <input className="input" placeholder="Digits only" {...register('contact', { required: true, pattern: /^[0-9]{7,15}$/ })} />
              {errors.contact && <small className="sub">Enter a valid number (7-15 digits)</small>}
            </div>
            <div>
              <label className="label">Email</label>
              <input className="input" placeholder="someone@example.com" {...register('email_id', { required: true, pattern: /^\S+@\S+\.\S+$/ })} />
              {errors.email_id && <small className="sub">Enter a valid email</small>}
            </div>
          </div>

          <div className="row">
            <label className="label">School Image (upload)</label>
            <input type="file" className="file" accept="image/*" {...register('image')} />
            <small className="note">If deploying to Vercel, filesystem uploads don't persist. You can alternatively paste an image URL below.</small>
          </div>

          <div className="row">
            <label className="label">OR Image URL</label>
            <input className="input" placeholder="https://..." {...register('imageUrl')} />
          </div>

          <button className="btn" disabled={submitting} type="submit">{submitting ? 'Saving...' : 'Save'}</button>
          {message && <p style={{marginTop:12}} className="note">{message}</p>}
        </form>
      </div>
    </div>
  );
}
