<?php

namespace App\Strategies;

use Illuminate\Support\Collection;

interface AggregationStrategyInterface
{
    /**
     * Esegue l'aggregazione delle attività secondo una specifica strategia.
     *
     * @param Collection $activities Le attività da aggregare
     * @param array $groupingFields I campi per il raggruppamento
     * @return Collection Le attività aggregate
     */
    public function aggregate(Collection $activities, array $groupingFields): Collection;
}
