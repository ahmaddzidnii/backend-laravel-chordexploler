<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SongRequest extends FormRequest
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
            'title' => ['required', 'string', 'max:255'],
            'artist' => ['required', 'string'],
            'key' => ['required'],
            'status' => ['required', Rule::in(['draft', 'published'])],
            'cover' => ['required', 'image', 'mimes:jpeg,png,jpg,gif,svg', 'max:5072'],
            'genre' => ['required', 'string'],
            'youtube_url' => ['required', 'string', 'url'],
            'released_year' => ['required', 'numeric'],
            'publisher' => ['required', 'string'],
            'bpm' => ['required', 'numeric'],
            'key' => ['required'],
        ];
    }
}
