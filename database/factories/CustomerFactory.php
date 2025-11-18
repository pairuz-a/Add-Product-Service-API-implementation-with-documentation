<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $companies = ['Microsoft', 'Google', 'Apple', 'Amazon', 'Facebook', 'Tesla', 'Netflix', 'Adobe', 'Yahoo', 'Oracle', 'IBM', 'Intel', 'Cisco', 'Samsung', 'Sony'];
        $status = fake()->randomElement(['active', 'inactive']);
        $isMember = fake()->boolean(35);
        
        return [
            'name' => fake()->name(),
            'company' => fake()->randomElement($companies),
            'phone' => fake()->phoneNumber(),
            'email' => fake()->unique()->safeEmail(),
            'country' => fake()->country(),
            'status' => $status,
            'is_member' => $isMember,
            'avatar' => null,
            'last_active_at' => $status === 'active' 
                ? fake()->dateTimeBetween('-5 minutes', 'now')
                : fake()->dateTimeBetween('-30 days', '-1 hour'),
        ];
    }

    /**
     * customer is active.
     */
    public function active()
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'active',
            'last_active_at' => now(),
        ]);
    }

    /**
     * customer is inactive.
     */
    public function inactive()
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'inactive',
            'last_active_at' => fake()->dateTimeBetween('-30 days', '-6 hours'),
        ]);
    }

    /**
     * customer is a member
     */
    public function member()
    {
        return $this->state(fn (array $attributes) => [
            'is_member' => true,
        ]);
    }
}