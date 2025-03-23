<?php

namespace App\Services;

use App\Repositories\ActivityRepositoryInterface;
use App\Strategies\AggregationStrategyInterface;
use App\Strategies\DefaultAggregationStrategy;
use Illuminate\Support\Collection;

class ActivityService
{
    private $activityRepository;
    private $aggregationStrategy;

    public function __construct(
        ActivityRepositoryInterface $activityRepository,
        ?AggregationStrategyInterface $aggregationStrategy = null
    ) {
        $this->activityRepository = $activityRepository;
        $this->aggregationStrategy = $aggregationStrategy ?? new DefaultAggregationStrategy();
    }

    /**
     * Recupera tutte le attività con le relative relazioni.
     */
    public function getAllActivities(): Collection
    {
        return $this->activityRepository->getAllWithRelations();
    }

    /**
     * Recupera le attività ordinate secondo i campi specificati.
     *
     * @param array $sortBy Array di campi per l'ordinamento
     * @return Collection Collezione di attività ordinate
     */
    public function getOrderedActivities(array $sortBy): Collection
    {
        return $this->activityRepository->getAllWithRelations()
            ->map(function ($activity) {
                return $this->transformActivityToArray($activity);
            })
            ->sortBy(function ($activity) use ($sortBy) {
                return $this->extractSortingValues($activity, $sortBy);
            })
            ->values();
    }

    /**
     * Trasforma un'attività in un array strutturato.
     *
     * @param mixed $activity L'attività da trasformare
     * @return array L'attività trasformata
     */
    private function transformActivityToArray($activity): array
    {
        return [
            'project' => [
                'id' => $activity->project->id,
                'name' => $activity->project->name,
            ],
            'employee' => [
                'id' => $activity->employee->id,
                'name' => $activity->employee->name,
            ],
            'date' => $activity->date->format('Y-m-d'),
            'hours' => $activity->hours,
        ];
    }

    /**
     * Estrae i valori per l'ordinamento da un'attività.
     *
     * @param array $activity L'attività da cui estrarre i valori
     * @param array $orderBy I campi per l'ordinamento
     * @return array I valori per l'ordinamento
     */
    private function extractSortingValues(array $activity, array $orderBy): array
    {
        return collect($orderBy)
            ->map(function ($field) use ($activity) {
                return isset($activity[$field]['name'])
                    ? $activity[$field]['name']
                    : $activity[$field];
            })
            ->toArray();
    }

    /**
     * Aggrega le attività utilizzando la strategia di aggregazione configurata.
     *
     * @param Collection $activities Collezione di attività da aggregare
     * @param array $groupBy Array di campi per il raggruppamento
     * @return Collection Collezione di attività aggregate
     */
    public function aggregateActivities(Collection $activities, array $groupBy): Collection
    {
        return $this->aggregationStrategy->aggregate($activities, $groupBy);
    }
}
