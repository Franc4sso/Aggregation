<?php

namespace App\Repositories;

use App\Models\Activity;
use Illuminate\Support\Collection;

interface ActivityRepositoryInterface
{
    public function getAllWithRelations(): Collection;
}
