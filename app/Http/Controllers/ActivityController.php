<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Repositories\ActivityRepository;
use App\Services\ActivityService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Collection;

class ActivityController extends Controller
{


    public function show(Request $request)
    {
        $selectedFields = $request->input('selectedFields', []);
        $service = new ActivityService(new ActivityRepository());
        $activities = $service->getOrderedActivities($selectedFields);


        if (!empty($selectedFields)) {
            $activities = $service->aggregateActivities($activities, $selectedFields);
        }


        return Inertia::render('Activities/Index', [
            'activities' => $activities,
            'selectedFields' => $selectedFields,
        ]);
    }
}
