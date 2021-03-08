<?php 

return [
    1 => [
        "id" => 1,
        "name" => "GitHub OAuth2",
        "pattern" => "/^\\/auth\\/github/",
        "reverse" => "",
        "module" => NULL,
        "controller" => "@AppBundle\\Controller\\OAuthController",
        "action" => "github",
        "variables" => "code,state",
        "defaults" => NULL,
        "siteId" => [

        ],
        "methods" => [
            "POST"
        ],
        "priority" => 0,
        "creationDate" => 1615133886,
        "modificationDate" => 1615136520
    ]
];
