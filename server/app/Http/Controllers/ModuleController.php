<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Exception;
use Ixudra\Curl\Facades\Curl;

class ModuleController extends Controller
{

    private $ANONYMOUS_TOKEN;
    private $APP_NAME;
    private $REST_URL;

    public function __construct(){
        $this->ANONYMOUS_TOKEN = env('ANONYMOUS_TOKEN');
        $this->APP_NAME = env('APP_NAME');
        $this->REST_URL = env('REST_URL');
    }
    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function show($module_name)
    {
        $module = array();
        $detail = 'No content found';
        $user = array();
        $response = Curl::to($this->REST_URL . '/1/function/general/getModule?parameters={"name":"' . $module_name . '"}')
            ->withHeader('AnonymousToken: ' . $this->ANONYMOUS_TOKEN)
            ->withHeader('AppName:' . $this->APP_NAME)
            ->withData( array( 'parameters' => '{"name":"'.$module_name.'"}' ) )
            ->withOption('RETURNTRANSFER', '1')
            ->withOption('IPRESOLVE', 'CURL_IPRESOLVE_V4')
            ->withOption('ENCODING', 'gzip')
            ->asJson()
            ->returnResponseObject()
            ->enableDebug('/Applications/MAMP/htdocs/backand-projects/fnhub/server/storage/logs/logFile.txt')
            ->post();
        if (isset($response->content) && !is_null($response->content) && $response->status == 200) {
            $server_output_json = json_decode(json_encode($response->content), true);
            $module = $server_output_json['data'][0];
            $user = $server_output_json['relatedObjects']['users'][$module['creator']];

            if (isset($module['keywords'])) {
                $module['keywords'] = explode(',', $module['keywords']);
            } else {
                $module['keywords'] = [];
            }

            if (isset($module['githubRepo'])) {
                try {
                    $repo = str_replace('github.com', 'raw.githubusercontent.com', $module['githubRepo']) . '/master/README.md';

                    $response = Curl::to($this->REST_URL . '/1/function/general/mdToHtml?parameters={"mdFileUri":"' . $repo . '"}')
                        ->withHeader('AnonymousToken: ' . $this->ANONYMOUS_TOKEN)
                        ->withHeader('AppName:' . $this->APP_NAME)
                        ->withData( array( 'parameters' => '{"mdFileUri":"' . $repo . '"}' ) )
                        ->withOption('RETURNTRANSFER', '1')
                        ->asJson()
                        ->returnResponseObject()
                        ->enableDebug('/Applications/MAMP/htdocs/backand-projects/fnhub/server/storage/logs/logFile.txt')
                        ->post();

                    if (isset($response->content) && !is_null($response->content) && $response->status == 200) {
                        $server_output_json = json_decode(json_encode($response->content), true);
                        if (is_array($server_output_json) && isset($server_output_json['errorMessage'])) {
                            \Log::info('Error mdToHtml', $server_output_json);
                        } else {
                            $detail = $server_output_json;
                        }
                    } else {
                        \Log::info('Error while mdtohtml', array('respone' => $response, 'repoUrl'=> $repo ));
                    }

                } catch (\Exception $e) {
                    \Log::info('Error mdToHtml', $e);
                }
            }
        } else {
            \Log::info('Error while getModule', array('respone' => $response));
        }


        $languages = array(
            array(
                'id' => 1,
                'name' => 'JavaScript',
                'key' => 'javascript'
            ),
            array(
                'id' => 2,
                'name' => 'PHP',
                'key' => 'php'
            ),
            array(
                'id' => 3,
                'name' => 'Python',
                'key' => 'python'
            ),
            array(
                'id' => 3,
                'name' => 'Java',
                'key' => 'java'
            )
        );


        return view('search', ['module' => $module, 'detail' => $detail, 'user' => $user, 'languages' => $languages]);
    }

}
