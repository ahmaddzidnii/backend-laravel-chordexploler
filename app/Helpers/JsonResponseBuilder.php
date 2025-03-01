<?php

namespace App\Helpers;

use Illuminate\Support\Str;

class JsonResponseBuilder
{
    public static function jsonResponseCollectionSuccess(
        mixed $data = [],
        string $kind = "",
        int $current_item_count,
        int $items_per_page,
        int $current_page,
        int $total_items,
        int $total_pages,
        bool $has_next_page,
        bool $has_previous_page,
        string $data_key = "items"
    ) {

        $appName = config("app.name");
        $appVersion = config("app.version");

        return [
            "api_version" => $appVersion,
            "request_id" => Str::uuid7(),
            "data" => [
                "kind" => "$appName#$kind",
                "current_item_count" => $current_item_count,
                "items_per_page" => $items_per_page,
                "current_page" => $current_page,
                "total_items" => $total_items,
                "total_pages" => $total_pages,
                "has_next_page" => $has_next_page,
                "has_previous_page" => $has_previous_page,
                $data_key => $data,
            ],
        ];
    }

    public static function jsonResponseSingleSuccess(mixed $data = [], string $kind = "")
    {
        $appName = config("app.name");
        $appVersion = config("app.version");
        return [
            "api_version" => $appVersion,
            "request_id" => Str::uuid7(),
            "kind" => "$appName#$kind",
            "data" => $data,
        ];
    }

    public static function jsonResponseMessageOnly(
        string $message,
        string $kind = "successMessage"
    ) {
        $appName = config("app.name");
        $appVersion = config("app.version");

        return [
            "api_version" => $appVersion,
            "request_id" => Str::uuid7(),
            "kind" => "$appName#$kind",
            "message" => $message,
        ];
    }
}
