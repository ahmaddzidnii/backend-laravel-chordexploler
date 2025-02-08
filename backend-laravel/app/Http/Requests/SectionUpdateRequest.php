<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SectionUpdateRequest extends FormRequest
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
            'id' => ['required', 'string', 'exists:sections,id'],
            'name' => ['nullable', 'string'],
            'start_time' => ['nullable', 'integer', 'min:0', function ($attribute, $value, $fail) {
                if (request()->has('end_time') && $value >= request()->end_time) {
                    $fail('The ' . $attribute . ' must be less than end time.');
                }
            }],
            'end_time' => ['nullable', 'integer', 'min:0', function ($attribute, $value, $fail) {
                if (request()->has('start_time') && $value <= request()->start_time) {
                    $fail('The ' . $attribute . ' must be greater than start time.');
                }
            }],
            'content' => ['nullable', 'string'],
        ];
    }
}
