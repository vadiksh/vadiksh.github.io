<?php
define("TEAMTAILOR_URL",     "https://api.teamtailor.com/v1/jobs");
define("BLUDIT_URL",    "http://localhost:3000/api/pages");
define('TEAMTAILOR_TOKEN', '');
define('TEAMTAILOR_VERSION', '20161108');
define('BLUDIT_TOKEN', '');
define('BLUDIT_AUTHENTICATION', '');

header("Access-Control-Allow-Origin: *");

    function SendRequest_to_teamtailor(){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, TEAMTAILOR_URL);        
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $headers = [
            "Authorization: Token token=".TEAMTAILOR_TOKEN,
            "X-Api-Version: ".TEAMTAILOR_VERSION
        ];
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        $server_output = curl_exec ($ch);
        curl_close ($ch);
      
        
        $tt = json_decode($server_output);
        $jobs = $tt->data;
        $jobs_arr = [];
        $jobs_after = [];
        $jobs_before = [];
        $jobs_store = [];
        foreach($jobs as $job){
            $jobs_after[] = array('id'=> $job->id); 
            $jobs_arr[] = objectToArray($job);         
        }        
        
        
      
        $changeJobs = compareJobs($jobs_after);
        $job_o;
        if(file_exists("database/data.json")){
            $string = file_get_contents("database/data.json");
            $job_o = json_decode($string, true);         
        }
        if(count($changeJobs['new_jobs']) > 0){
           
            foreach($changeJobs['new_jobs'] as $job){
               
                $result_new;
                foreach($jobs_arr as $item){  
                    if($item['id'] == $job){
                        $result_new = SendNewRequest_to_bludit($item);
                        if($result_new->status == '0'){                           
                            $data = $result_new->data;                          
                            $key = $data->key;
                            $job_o[] = array('id'=> $job, 'key' => $key);
                        }
                        break;
                    }
                }                      
            }
        }
        if(count($changeJobs['removed_jobs']) > 0){
            foreach($changeJobs['removed_jobs'] as $job){
                $result_remove;
                foreach($job_o as $key => $item){
                    if($item['id'] == $job){
                        $result_remove = SendRemoveRequest_to_bludit($item['key']); // Remove a page from bludit
                        unset($job_o[$key]); // Remove from the history
                    }
                }
            }
        }
      
        
        if(count($changeJobs['new_jobs']) > 0 || count($changeJobs['removed_jobs']) > 0){
            store($job_o);
        }
        
      
    }


    function objectToArray($d) 
    {
        if (is_object($d)) {
            // Gets the properties of the given object
            // with get_object_vars function
            $d = get_object_vars($d);
        }

        if (is_array($d)) {
            /*
            * Return array converted to object
            * Using __FUNCTION__ (Magic constant)
            * for recursive call
            */
            return array_map(__FUNCTION__, $d);
        } else {
            // Return array
            return $d;
        }
    }


    function compareJobs($job_b){
        $new_jobs = [];
        $removed_jobs = [];

        if(file_exists("database/data.json")){
            $string = file_get_contents("database/data.json");
            $job_o = json_decode($string, true);            
          
            if($job_o == NULL){
                foreach($job_b as $job){                    
                    $new_jobs[] = $job['id'];
                }    
            } else {
                $jo = [];
                $jb = [];
                foreach($job_o as $job){
                    $jo[] = $job['id'];
                }
                foreach($job_b as $job){
                    $jb[] = $job['id'];
                }
                $new_jobs = array_diff($jb, $jo);
                $removed_jobs = array_diff($jo, $jb);
            }   
            

        } else {
            foreach($job_b as $job){
                $new_jobs[] = $job['id'];
            }            
        }
        $return = array(
            'new_jobs' => $new_jobs, 
            'removed_jobs' => $removed_jobs
        );
        return $return;
    }


    function store($data){
        $fp = fopen('database/data.json', 'w');
        fwrite($fp, json_encode($data));
        fclose($fp);
        
    }


    // Send add a page request to the bludit
    function SendNewRequest_to_bludit($job){
        $ch = curl_init();       
        $bludit_url;        
        curl_setopt($ch, CURLOPT_POST, 1);      
        $bludit_url = BLUDIT_URL;
        $title = $job['attributes']['title'];
        $content = $job['attributes']['body']."<br /><a class='apply-btn' href='".$job['links']['careersite-job-apply-url']."'>Apply</a>";
      
        $post = [
            'token' => BLUDIT_TOKEN, 
            'authentication' => BLUDIT_AUTHENTICATION,
            'title'   => $title,
            'content' => $content
        ];
        
        curl_setopt($ch, CURLOPT_URL, $bludit_url);  
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $server_output = curl_exec ($ch);
        curl_close ($ch);
        return  json_decode($server_output);
    }


    // Send delete page request to the bludit
    function SendRemoveRequest_to_bludit($key){
        $bludit_url;        
        $ch = curl_init();       
        $bludit_url = BLUDIT_URL.'/'.$key."?token=".BLUDIT_TOKEN."&authentication=".BLUDIT_AUTHENTICATION;    
        curl_setopt($ch, CURLOPT_URL, $bludit_url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
        //curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json',
            'Data-Type: application/json',
            ));
        $result = curl_exec($ch);
        curl_close($ch);        
    }
   
    SendRequest_to_teamtailor();
    $txt = "user id date ";
    $now = new DateTime();
    $myfile = file_put_contents('logs.txt', $txt.$now->format('Y-m-d H:i:s').PHP_EOL , FILE_APPEND | LOCK_EX);
   
  

?>