<?php

class Response
{
    public static function send($status, $message, $data = null, $code = 200)
    {
        http_response_code($code);
        echo json_encode([
            "status" => $status,
            "message" => $message,
            "data" => $data
        ]);
        exit;
    }

    public static function success($message, $data = null)
    {
        self::send("success", $message, $data, 200);
    }

    public static function error($message, $code = 400)
    {
        self::send("error", $message, null, $code);
    }
}
?>