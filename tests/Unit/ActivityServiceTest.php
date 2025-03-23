<?php

namespace Tests\Unit;

use App\Services\ActivityService;
use App\Repositories\ActivityRepositoryInterface;
use Illuminate\Support\Collection;
use Tests\TestCase;
use Mockery;

class ActivityServiceTest extends TestCase
{
    private $activityService;
    private $activityRepository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->activityRepository = Mockery::mock(ActivityRepositoryInterface::class);
        $this->activityService = new ActivityService($this->activityRepository);
    }

    public function test_aggregate_activities_by_project()
    {
        $activities = new Collection([
            [
                'project' => ['id' => 1, 'name' => 'Mars Rover'],
                'employee' => ['id' => 1, 'name' => 'Mario'],
                'date' => '2024-01-15',
                'hours' => 5
            ],
            [
                'project' => ['id' => 1, 'name' => 'Mars Rover'],
                'employee' => ['id' => 2, 'name' => 'Lucia'],
                'date' => '2024-01-15',
                'hours' => 3
            ],
            [
                'project' => ['id' => 2, 'name' => 'Manhattan'],
                'employee' => ['id' => 3, 'name' => 'Giovanni'],
                'date' => '2024-01-15',
                'hours' => 4
            ]
        ]);

        $result = $this->activityService->aggregateActivities($activities, ['project']);

        $this->assertCount(2, $result);
        $this->assertEquals([
            [
                'project' => 'Mars Rover',
                'hours' => 8
            ],
            [
                'project' => 'Manhattan',
                'hours' => 4
            ]
        ], $result->toArray());

        $resultByProjectAndEmployee = $this->activityService->aggregateActivities($activities, ['project', 'employee']);

        $this->assertCount(3, $resultByProjectAndEmployee);
        $this->assertEquals([
            [
                'project' => 'Mars Rover',
                'employee' => 'Mario',
                'hours' => 5
            ],
            [
                'project' => 'Mars Rover',
                'employee' => 'Lucia',
                'hours' => 3
            ],
            [
                'project' => 'Manhattan',
                'employee' => 'Giovanni',
                'hours' => 4
            ]
        ], $resultByProjectAndEmployee->toArray());
    }
}
