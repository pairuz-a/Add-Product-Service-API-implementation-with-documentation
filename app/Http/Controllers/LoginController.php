<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Api\AuthController as ApiAuthController;

class LoginController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    public function showRegister()
    {
        return Inertia::render('Auth/Register');
    }

    public function login(Request $request)
    {
        $authController = new ApiAuthController();
        $response = $authController->login($request);
        
        if ($response->status() === 200) {
            $data = $response->getData();
            $token = $data->data->token ?? null;
            
            if ($token) {
                session(['token' => $token]);
                return redirect('/');
            }
        }

        return back()->withErrors(['email' => 'Invalid credentials']);
    }

    public function register(Request $request)
    {
        $authController = new ApiAuthController();
        $response = $authController->register($request);
        
        if ($response->status() === 201) {
            $data = $response->getData();
            $token = $data->data->token ?? null;
            
            if ($token) {
                session(['token' => $token]);
                return redirect('/');
            }
        }

        return back()->withErrors(['email' => 'Registration failed']);
    }

    public function logout()
    {
        session()->forget('token');
        return redirect('/login');
    }
}