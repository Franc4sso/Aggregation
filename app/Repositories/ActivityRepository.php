<?php

namespace App\Repositories;

use App\Models\Activity;
use Illuminate\Support\Collection;

class ActivityRepository implements ActivityRepositoryInterface
{
    public function getAllWithRelations(): Collection
    {
        return Activity::with(['project', 'employee'])->get();
    }
}
