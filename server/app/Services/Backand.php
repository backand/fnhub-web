<?php

namespace App\Services;

use Illuminate\Support\Facades\Cookie;
use Exception;
use Ixudra\Curl\Facades\Curl;

class Backand
{

    private $ANONYMOUS_TOKEN;
    private $APP_NAME;
    private $REST_URL;

    public function __construct()
    {
        $this->ANONYMOUS_TOKEN = env('BACKAND_ANONYMOUS_TOKEN');
        $this->APP_NAME = env('BACKAND_APP_NAME');
        $this->REST_URL = env('BACKAND_REST_URL');
    }


    public function getLanguages()
    {
        return array(
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
                'id' => 4,
                'name' => 'Java',
                'key' => 'java'
            ),
            array(
                'id' => 5,
                'name' => 'Node',
                'key' => 'node'
            )
        );
    }

    /**
     * @param $module
     */
    public function getModule($module)
    {
    }

    /**
     * @param $githubRepo
     * @return array|mixed|string
     */
    public function getMDtoHTML($githubRepo)
    {
        $detail = '';
        try {
            $repo = str_replace('github.com', 'raw.githubusercontent.com', $githubRepo) . '/master/README.md';

            $response = Curl::to($this->REST_URL . '/1/function/general/mdToHtml?parameters={"mdFileUri":"' . $repo . '"}')
                ->withHeader('AnonymousToken: ' . $this->ANONYMOUS_TOKEN)
                ->withHeader('AppName:' . $this->APP_NAME)
                ->withData(array('parameters' => '{"mdFileUri":"' . $repo . '"}'))
                ->withOption('RETURNTRANSFER', '1')
                ->asJson()
                ->returnResponseObject()
                ->enableDebug(storage_path() + '/logs/logFile.txt')
                ->post();

            if (isset($response->content) && !is_null($response->content) && $response->status == 200) {
                $server_output_json = json_decode(json_encode($response->content), true);
                if (is_array($server_output_json) && isset($server_output_json['errorMessage'])) {
                    \Log::info('Error mdToHtml', $server_output_json);
                } else {
                    $detail = $server_output_json;
                }
            } else {
                \Log::info('Error while mdtohtml', array('respone' => $response, 'repoUrl' => $repo));
            }

        } catch (\Exception $e) {
            \Log::info('Error mdToHtml', $e);
        }

        return $detail;
    }

    /**
     * @param $username
     * @return array|mixed
     */
    public function getUserbyUserName($username)
    {
        $user = array(
            "email" => "",
            "firstName" => "",
            "lastName" => "",
            "fullName" => "",
            "modules" => []
        );
        try {
            $response = Curl::to($this->REST_URL . '/1/function/general/module')
                ->withHeader('AnonymousToken: ' . $this->ANONYMOUS_TOKEN)
                ->withHeader('AppName:' . $this->APP_NAME)
                ->withData(array('username' => $username))
                ->withData(array('parameters' => '{}', 'username'=> $username, 'path' => 'getUser'))
                ->withOption('RETURNTRANSFER', '1')
                ->asJson()
                ->returnResponseObject()
                ->enableDebug(storage_path() + '/logs/logFile.txt')
                ->post();
            if (isset($response->content) && !is_null($response->content) && $response->status == 200) {
                $server_output_json = json_decode(json_encode($response->content), true);
                if (is_array($server_output_json) && isset($server_output_json['errorMessage'])) {
                    \Log::info('Success Response Error - getUserbyUserName', $server_output_json);
                } else {
                    $user = $server_output_json;
                }
            } else {
                \Log::info('Bad Response error - getUserbyUserName', array('respone' => $response, 'username' => $username));
            }

        } catch (\Exception $e) {
            \Log::info('Error getUserbyUserName', $e);
        }

        return $user;
    }
}
