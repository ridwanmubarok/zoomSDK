<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ZoomController extends Controller
{

    public function index()
    {
        return view('zoom.index');
    }

    public function signature(Request $request)
    {
        $meeting_number = $request['meetingNumber'];
        $role = $request['role'];
        $api_key = Config('zoom.apiKey');
        $api_secret = Config('zoom.apiSecret');
        //Set the timezone to UTC
        date_default_timezone_set("UTC");
        $time = time() * 1000 - 30000; //time in milliseconds (or close enough)
        $data = base64_encode($api_key . $meeting_number . $time . $role);
        $hash = hash_hmac('sha256', $data, $api_secret, true);
        $_sig = $api_key . "." . $meeting_number . "." . $time . "." . $role . "." . base64_encode($hash);
        //return signature, url safe base64 encoded
        return response()->json([
            'signature' => rtrim(strtr(base64_encode($_sig), '+/', '-_'), '=')
        ]);
    }
}
