<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckJwtToken
{
    public function handle(Request $request, Closure $next)
    {
        $token = session('token');

        if (!$token) {
            return redirect('/login');
        }

        // Add token to request headers for API calls
        $request->headers->set('Authorization', "Bearer {$token}");

        return $next($request);
    }
}