<?php

namespace App\Strategies;

use Illuminate\Support\Collection;

class DefaultAggregationStrategy implements AggregationStrategyInterface
{
    /**
     * Esegue l'aggregazione delle attività secondo la strategia predefinita.
     *
     * @param Collection $activities Le attività da aggregare
     * @param array $groupingFields I campi per il raggruppamento
     * @return Collection Le attività aggregate
     */
    public function aggregate(Collection $activities, array $groupingFields): Collection
    {
        return $activities
            ->groupBy(function ($item) use ($groupingFields) {
                return $this->createUniqueGroupingKey($item, $groupingFields);
            })
            ->map(function ($group) use ($groupingFields) {
                return $this->calculateAggregatedGroup($group, $groupingFields);
            })
            ->values();
    }

    /**
     * Crea una chiave univoca per il raggruppamento delle attività.
     *
     * @param array $item Singola attività
     * @param array $groupingFields Campi per il raggruppamento
     * @return string Chiave di raggruppamento
     */
    private function createUniqueGroupingKey(array $item, array $groupingFields): string
    {
        return collect($groupingFields)
            ->map(function ($field) use ($item) {
                return "{$field}:" . $this->extractFieldValueFromActivityData($item, $field);
            })
            ->join('|');
    }

    /**
     * Estrae il valore del campo dall'attività.
     *
     * @param array $item Singola attività
     * @param string $field Nome del campo
     * @return string Valore del campo
     */
    private function extractFieldValueFromActivityData(array $item, string $field): string
    {
        if ($field === 'date') {
            return $item[$field];
        }

        return is_array($item[$field]) && isset($item[$field]['name'])
            ? $item[$field]['name']
            : (string) $item[$field];
    }

    /**
     * Calcola i valori aggregati per un gruppo di attività.
     *
     * @param Collection $group Gruppo di attività
     * @param array $groupingFields Campi per il raggruppamento
     * @return array Attività aggregata
     */
    private function calculateAggregatedGroup(Collection $group, array $groupingFields): array
    {
        $firstActivity = $group->first();
        $aggregationFields = $this->extractGroupingFields($firstActivity, $groupingFields);

        return array_merge(
            $aggregationFields,
            ['hours' => $group->sum('hours')]
        );
    }

    /**
     * Estrae i campi di raggruppamento da un'attività.
     *
     * @param array $item Singola attività
     * @param array $groupingFields Campi per il raggruppamento
     * @return array Campi estratti
     */
    private function extractGroupingFields(array $item, array $groupingFields): array
    {
        return collect($groupingFields)
            ->mapWithKeys(function ($field) use ($item) {
                return [$field => $this->extractFieldValueFromActivityData($item, $field)];
            })
            ->all();
    }
}
