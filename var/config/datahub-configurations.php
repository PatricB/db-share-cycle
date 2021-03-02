<?php 

return [
    "folders" => [

    ],
    "list" => [
        "db-sc-app" => [
            "general" => [
                "active" => TRUE,
                "type" => "graphql",
                "name" => "db-sc-app",
                "description" => "",
                "sqlObjectCondition" => "",
                "modificationDate" => 1614823019,
                "path" => NULL
            ],
            "schema" => [
                "queryEntities" => [
                    "station" => [
                        "id" => "station",
                        "name" => "station",
                        "columnConfig" => [
                            "columns" => [
                                [
                                    "attributes" => [
                                        "attribute" => "id",
                                        "label" => "id",
                                        "dataType" => "system",
                                        "layout" => [
                                            "title" => "id",
                                            "name" => "id",
                                            "datatype" => "data",
                                            "fieldtype" => "system"
                                        ]
                                    ],
                                    "isOperator" => FALSE
                                ],
                                [
                                    "attributes" => [
                                        "attribute" => "key",
                                        "label" => "key",
                                        "dataType" => "system",
                                        "layout" => [
                                            "title" => "key",
                                            "name" => "key",
                                            "datatype" => "data",
                                            "fieldtype" => "system"
                                        ]
                                    ],
                                    "isOperator" => FALSE
                                ],
                                [
                                    "attributes" => [
                                        "attribute" => "polygon",
                                        "label" => "Positionsfläche",
                                        "dataType" => "geopolygon",
                                        "layout" => [
                                            "fieldtype" => "geopolygon",
                                            "queryColumnType" => "longtext",
                                            "columnType" => "longtext",
                                            "phpdocType" => "array",
                                            "lat" => 51.336,
                                            "lng" => 12.37499,
                                            "zoom" => 17,
                                            "width" => NULL,
                                            "height" => NULL,
                                            "mapType" => "roadmap",
                                            "name" => "polygon",
                                            "title" => "Positionsfläche",
                                            "tooltip" => "",
                                            "mandatory" => TRUE,
                                            "noteditable" => FALSE,
                                            "index" => FALSE,
                                            "locked" => FALSE,
                                            "style" => "",
                                            "permissions" => NULL,
                                            "datatype" => "data",
                                            "relationType" => FALSE,
                                            "invisible" => FALSE,
                                            "visibleGridView" => FALSE,
                                            "visibleSearch" => FALSE
                                        ]
                                    ],
                                    "isOperator" => FALSE
                                ]
                            ]
                        ]
                    ],
                    "vehicle" => [
                        "id" => "vehicle",
                        "name" => "vehicle",
                        "columnConfig" => [
                            "columns" => [
                                [
                                    "attributes" => [
                                        "attribute" => "id",
                                        "label" => "id",
                                        "dataType" => "system",
                                        "layout" => [
                                            "title" => "id",
                                            "name" => "id",
                                            "datatype" => "data",
                                            "fieldtype" => "system"
                                        ]
                                    ],
                                    "isOperator" => FALSE
                                ],
                                [
                                    "attributes" => [
                                        "attribute" => "key",
                                        "label" => "key",
                                        "dataType" => "system",
                                        "layout" => [
                                            "title" => "key",
                                            "name" => "key",
                                            "datatype" => "data",
                                            "fieldtype" => "system"
                                        ]
                                    ],
                                    "isOperator" => FALSE
                                ],
                                [
                                    "attributes" => [
                                        "attribute" => "vehicle_type",
                                        "label" => "Type",
                                        "dataType" => "select",
                                        "layout" => [
                                            "fieldtype" => "select",
                                            "options" => [
                                                [
                                                    "key" => "Fahrrad",
                                                    "value" => "Fahrrad"
                                                ],
                                                [
                                                    "key" => "Lastenrad",
                                                    "value" => "Lastenrad"
                                                ]
                                            ],
                                            "width" => "",
                                            "defaultValue" => "Fahrrad",
                                            "optionsProviderClass" => "",
                                            "optionsProviderData" => "",
                                            "queryColumnType" => "varchar",
                                            "columnType" => "varchar",
                                            "columnLength" => 190,
                                            "phpdocType" => "string",
                                            "dynamicOptions" => FALSE,
                                            "name" => "vehicle_type",
                                            "title" => "Type",
                                            "tooltip" => "",
                                            "mandatory" => TRUE,
                                            "noteditable" => FALSE,
                                            "index" => TRUE,
                                            "locked" => FALSE,
                                            "style" => "",
                                            "permissions" => NULL,
                                            "datatype" => "data",
                                            "relationType" => FALSE,
                                            "invisible" => FALSE,
                                            "visibleGridView" => FALSE,
                                            "visibleSearch" => TRUE,
                                            "defaultValueGenerator" => ""
                                        ]
                                    ],
                                    "isOperator" => FALSE
                                ],
                                [
                                    "attributes" => [
                                        "attribute" => "position",
                                        "label" => "Position",
                                        "dataType" => "geopoint",
                                        "layout" => [
                                            "fieldtype" => "geopoint",
                                            "queryColumnType" => [
                                                "longitude" => "double",
                                                "latitude" => "double"
                                            ],
                                            "columnType" => [
                                                "longitude" => "double",
                                                "latitude" => "double"
                                            ],
                                            "phpdocType" => "\\Pimcore\\Model\\DataObject\\Data\\Geopoint",
                                            "lat" => 51.336,
                                            "lng" => 12.37499,
                                            "zoom" => 17,
                                            "width" => NULL,
                                            "height" => NULL,
                                            "mapType" => "roadmap",
                                            "name" => "position",
                                            "title" => "Position",
                                            "tooltip" => "",
                                            "mandatory" => TRUE,
                                            "noteditable" => FALSE,
                                            "index" => FALSE,
                                            "locked" => FALSE,
                                            "style" => "",
                                            "permissions" => NULL,
                                            "datatype" => "data",
                                            "relationType" => FALSE,
                                            "invisible" => FALSE,
                                            "visibleGridView" => FALSE,
                                            "visibleSearch" => TRUE
                                        ]
                                    ],
                                    "isOperator" => FALSE
                                ]
                            ]
                        ]
                    ]
                ],
                "mutationEntities" => [

                ],
                "specialEntities" => [
                    "document" => [
                        "read" => FALSE,
                        "create" => FALSE,
                        "update" => FALSE,
                        "delete" => FALSE
                    ],
                    "document_folder" => [
                        "read" => FALSE,
                        "create" => FALSE,
                        "update" => FALSE,
                        "delete" => FALSE
                    ],
                    "asset" => [
                        "read" => FALSE,
                        "create" => FALSE,
                        "update" => FALSE,
                        "delete" => FALSE
                    ],
                    "asset_folder" => [
                        "read" => FALSE,
                        "create" => FALSE,
                        "update" => FALSE,
                        "delete" => FALSE
                    ],
                    "asset_listing" => [
                        "read" => FALSE,
                        "create" => FALSE,
                        "update" => FALSE,
                        "delete" => FALSE
                    ],
                    "object_folder" => [
                        "read" => TRUE,
                        "create" => FALSE,
                        "update" => FALSE,
                        "delete" => FALSE
                    ]
                ]
            ],
            "security" => [
                "method" => "datahub_apikey",
                "apikey" => "82ab2eabcc70e6cacacbc085476a7318",
                "skipPermissionCheck" => FALSE
            ],
            "workspaces" => [
                "asset" => [

                ],
                "document" => [

                ],
                "object" => [
                    [
                        "read" => TRUE,
                        "cpath" => "/Fahrzeuge",
                        "create" => FALSE,
                        "update" => FALSE,
                        "delete" => FALSE,
                        "id" => "extModel470-1"
                    ],
                    [
                        "read" => TRUE,
                        "cpath" => "/Stationen",
                        "create" => FALSE,
                        "update" => FALSE,
                        "delete" => FALSE,
                        "id" => "extModel470-2"
                    ]
                ]
            ]
        ]
    ]
];
