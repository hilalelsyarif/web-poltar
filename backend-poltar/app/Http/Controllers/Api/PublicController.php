<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\Structure;

class PublicController extends Controller
{
    public function getActivities()
    {
        $activities = Activity::latest()->get();
        return response()->json(['success' => true, 'data' => $activities]);
    }

    public function getStructures()
    {
        $structures = Structure::all();
        return response()->json(['success' => true, 'data' => $structures]);
    }
}
