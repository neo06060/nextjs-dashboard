'use server';

import { z } from 'zod';
import postgres from 'postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

// ----------------- Authentication -----------------
export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

// ----------------- Sign Out -----------------
export async function signOutAction() {
  await (await import('@/auth')).signOut({ redirectTo: '/' });
}

// ----------------- Connect to Postgres -----------------
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Zod schema for invoices
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

// ----------------- Create Invoice -----------------
export async function createInvoice(formData: FormData) {
  let amountInCents: number;
  let customerId: string;
  let status: 'pending' | 'paid';

  try {
    const parsed = CreateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    customerId = parsed.customerId;
    amountInCents = parsed.amount * 100;
    status = parsed.status;

    const date = new Date().toISOString().split('T')[0];

    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    console.error('Create Invoice Error:', error);
    throw new Error(
      `Failed to create invoice: ${error instanceof Error ? error.message : error}`
    );
  }

  // Redirect after try/catch
  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// ----------------- Update Invoice -----------------
export async function updateInvoice(id: string, formData: FormData) {
  try {
    const { customerId, amount, status } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    });

    const amountInCents = amount * 100;

    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Update Invoice Error:', error);
    throw new Error(
      `Failed to update invoice: ${error instanceof Error ? error.message : error}`
    );
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

// ----------------- Delete Invoice -----------------
export async function deleteInvoice(id: string) {
  try {
    await sql`DELETE FROM invoices WHERE id = ${id}`;
  } catch (error) {
    console.error('Delete Invoice Error:', error);
    throw new Error(
      `Failed to delete invoice: ${error instanceof Error ? error.message : error}`
    );
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}
