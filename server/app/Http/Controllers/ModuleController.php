<?php

namespace App\Http\Controllers;

use App\Services\Backand;
use Illuminate\Http\Request;
use Exception;
use Ixudra\Curl\Facades\Curl;

class ModuleController extends Controller
{

    /**
     * @todo move config to backand service
     */
    private $ANONYMOUS_TOKEN;
    private $APP_NAME;
    private $REST_URL;
    private $backand;

    public function __construct(Backand $backand)
    {
        $this->backand = $backand;
        $this->ANONYMOUS_TOKEN = env('BACKAND_ANONYMOUS_TOKEN');
        $this->APP_NAME = env('BACKAND_APP_NAME');
        $this->REST_URL = env('BACKAND_REST_URL');
    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($module_name)
    {
        $module = array(
            'name'=>'',
            'updatedAt'=>'',
            'githubRepo'=>'',
            'language'=>'',
            'keywords'=> []
        );
        $detail = 'No content found';
        $user = array('fullName'=>'');
        $response = Curl::to($this->REST_URL . '/1/function/general/module')
            ->withHeader('AnonymousToken: ' . $this->ANONYMOUS_TOKEN)
            ->withHeader('AppName:' . $this->APP_NAME)
            ->withData(array('parameters' => '{}', 'name'=> $module_name, 'path' => 'get'))
            ->withOption('RETURNTRANSFER', '1')
            ->withOption('IPRESOLVE', 'CURL_IPRESOLVE_V4')
            ->withOption('ENCODING', 'gzip')
            ->asJson()
            ->returnResponseObject()
            ->enableDebug(storage_path() + '/logs/logFile.txt')
            ->post();
        if (isset($response->content) && !is_null($response->content) && $response->status == 200) {
            $server_output_json = json_decode(json_encode($response->content), true);
            $module = $server_output_json;
            $user = $module['creator'];

            if (isset($module['keywords'])) {
                $module['keywords'] = explode(',', $module['keywords']);
            } else {
                $module['keywords'] = [];
            }

            if (isset($module['githubRepo'])) {
                $detail = $this->backand->getMDtoHTML($module['githubRepo']);
            }
        } else {
            \Log::info('Error while getModule', array('respone' => $response));
        }


        $languages = $this->backand->getLanguages();

        return view('search', ['module' => $module, 'detail' => $detail, 'user' => $user, 'languages' => $languages]);
    }

}
