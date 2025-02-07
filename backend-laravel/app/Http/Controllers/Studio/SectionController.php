<?php

namespace App\Http\Controllers\Studio;

use App\Exceptions\AuthException;
use App\Http\Controllers\Controller;
use App\Http\Requests\SectionCreateRequest;
use App\Http\Requests\SectionUpdateRequest;
use App\Http\Resources\Studio\SectionResource;
use App\Models\Section;
use App\Traits\ApiResponseHelper;
use Illuminate\Support\Facades\DB;

class SectionController extends Controller
{

    use ApiResponseHelper;

    private function authorize(string $sectionId): Section
    {
        $curretUser = authContext()->getAuthUser()->sub;
        $section = Section::findOrFail($sectionId);

        if ($section->song->user_id !== $curretUser) {
            throw new AuthException('You are not authorized to update this section');
        }

        return $section;
    }

    public function index()
    {
        $validated = request()->validate([
            'song_id' => ["required", "string", "exists:songs,id"],
        ]);

        $sections  = Section::where([
            'song_id' => $validated['song_id'],
        ])->get();

        return $this->successResponse(SectionResource::collection($sections));
    }


    public function store(SectionCreateRequest $request)
    {
        // Validate the request
        $validated = $request->validate();

        // Calculate the next position
        $position = Section::where('song_id', $request->song_id)
            ->max('position');

        // Create the section with the calculated position
        $section = Section::create([
            ...$validated,
            'position' => $position ? $position + 1 : 1,
        ]);

        return $this->successResponse(new SectionResource($section), 201);
    }


    public function show(string $id)
    {
        $section = Section::where([
            'id' => $id,
        ])->first();

        $this->successResponse(new SectionResource($section));
    }

    public function update(SectionUpdateRequest $request)
    {
        $validated = $request->validate();

        // check if the user is authorized to update the section
        $section = $this->authorize($validated['id']);

        // Get updateable data by removing 'id' and null values
        $updateData = collect($validated)
            ->except('id')
            ->filter()
            ->toArray();

        // Update the section
        $section->update($updateData);

        // Return the section
        return $this->successResponse(new SectionResource($section));
    }

    public function massDestroy()
    {
        $validated = request()->validate([
            'ids' => ['required', 'array'],
        ]);

        try {
            DB::beginTransaction();
            Section::whereIn('id', $validated['ids'])->delete();
            DB::commit();

            return $this->successResponse(null, 204);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }

    public function reorder()
    {
        $validated = request()->validate([
            'sections' => ['required', 'array'],
        ]);

        try {
            DB::beginTransaction();
            foreach ($validated['sections'] as $section) {
                Section::where([
                    'id' => $section['id'],
                ])->update([
                    'position' => $section['position'],
                ]);
            }
            DB::commit();
            return $this->successResponse(null, 204);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
    }
}
