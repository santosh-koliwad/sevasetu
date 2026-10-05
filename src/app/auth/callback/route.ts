import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (!error) {
      // Check role
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
          const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single()
          if (profile?.role === 'admin') {
              return NextResponse.redirect(`${origin}/admin`)
          }
      }
      return NextResponse.redirect(`${origin}/dashboard`)
    }
  }

  return NextResponse.redirect(`${origin}/login?error=true`)
}
