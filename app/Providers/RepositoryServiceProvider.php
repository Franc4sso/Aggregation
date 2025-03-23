<?php

namespace App\Providers;

use App\Repositories\ActivityRepository;
use App\Repositories\ActivityRepositoryInterface;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register()
    {
        $this->app->bind(ActivityRepositoryInterface::class, ActivityRepository::class);
    }
}
