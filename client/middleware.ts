import { NextRequest, NextResponse } from 'next/server'
const protectedRoutes = ['/profile']
const publicRoutes = ['/login', '/register', '/']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)   
    const hasToken = true
    const user = "teste"
/*
    if (isProtectedRoute && !hasToken) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }

    if (
        isPublicRoute &&
        hasToken &&
        !req.nextUrl.pathname.startsWith('/profile')
    ) {
        return NextResponse.redirect(new URL(`/profile/${user}`, req.nextUrl))
    }
*/

    return NextResponse.next()
}