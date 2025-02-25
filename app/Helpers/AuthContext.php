<?php

namespace App\Helpers;

/**
 * Class AuthContext
 *
 * @description Manages authentication context throughout the application lifecycle
 */
class AuthContext
{
    /** @var array<string, mixed> */
    private $context;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->context = [];
    }

    /**
     * Set a user in the auth context
     *
     *
     * @param  mixed  $user  The user to set
     */
    public function setUser(mixed $user): void
    {
        $this->context['user'] = $user;
    }

    /**
     * Get the authenticated user
     */
    public function getAuthUser(): mixed
    {
        return $this->context['user'] ?? null;
    }

    /**
     * Get a value from the auth context
     *
     * @param  string  $key  The key to retrieve
     * @param  mixed  $default  The default value if key doesn't exist
     * @return mixed The value from the context or the default value
     */
    public function get(string $key, mixed $default = null): mixed
    {
        return $this->context[$key] ?? $default;
    }

    /**
     * Get all values from the auth context
     *
     * @return array<string, mixed>
     */
    public function all(): array
    {
        return $this->context;
    }
}
