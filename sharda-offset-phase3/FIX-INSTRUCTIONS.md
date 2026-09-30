# Phase 4 enquiry fix

This patch fixes the Phase 4 enquiry system against the Phase 3 Prisma schema.

## Root cause

The Phase 4 API checked:

- `service.isActive`
- `sample.isActive`

But the Phase 3 schema uses:

- `service.active`
- `sample.active`

That can cause the route to fail at runtime.

## Replace

Copy these two files into your existing project:

- `app/api/enquiries/route.ts`
- `components/customer/EnquiryForm.tsx`

Overwrite the existing Phase 4 versions.

## Verify the form is actually mounted

Your contact page must contain:

```tsx
import EnquiryForm from '@/components/customer/EnquiryForm';
```

and render:

```tsx
<EnquiryForm />
```

If you want service/sample dropdowns, pass database records as documented in your Phase 4 install notes.

## Restart

Stop the dev server with Ctrl+C, then:

```powershell
npm run dev
```

Open:

```text
http://localhost:3000/contact
```

Submit a test enquiry.

## Check the database

```powershell
npx prisma studio
```

Open `Enquiry` and confirm the new record.

## If it still fails

Open the browser DevTools -> Network, submit once, and inspect:

```text
POST /api/enquiries
```

The corrected form now displays non-JSON server responses too, so the error should be visible instead of appearing to do nothing.
