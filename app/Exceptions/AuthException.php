<?php

namespace App\Exceptions;

use Exception;

class AuthException extends Exception
{
    public function __construct($message = 'No token provided', $code = 401, ?Exception $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }
}
