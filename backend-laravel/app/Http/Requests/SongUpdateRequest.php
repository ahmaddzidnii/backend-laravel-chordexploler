<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SongUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['nullable', 'max:255'],
            'artist' => ['nullable'],
            'key' => ['nullable'],
            'status' => ['nullable', Rule::in(['draft', 'published'])],
            'cover' => ['nullable', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:5072'],
            'genre' => ['nullable'],
            'youtube_url' => ['nullable', 'url'],
            'released_year' => ['nullable', 'numeric'],
            'publisher' => ['nullable'],
            'bpm' => ['nullable', 'numeric'],
        ];
    }
}
