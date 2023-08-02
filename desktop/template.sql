PRAGMA foreign_keys = ON;
BEGIN TRANSACTION;
CREATE TABLE `mikro_orm_migrations` (
    `id` integer NOT NULL PRIMARY KEY autoincrement,
    `name` varchar(255),
    `executed_at` datetime DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE `amplifier_item` (
    `id` integer NOT NULL PRIMARY KEY autoincrement,
    `total_inputs` integer NOT NULL,
    `total_outputs` integer NOT NULL,
    `midi` integer NOT NULL,
    `physical_connectivity` JSON NULL,
    `network_connectivity` JSON NULL,
    `signal_protocol` integer NOT NULL,
    `max_sample_rate` text CHECK (
        `max_sample_rate` in (
            '44.1 kHz',
            '48 kHz',
            '96 kHz'
        )
    ) NOT NULL,
    `power` JSON NULL
);
INSERT INTO amplifier_item
VALUES(
        1,
        4,
        4,
        1,
        '[{"connector_type":8,"signal_lines":1,"input":false},{"connector_type":8,"signal_lines":2,"input":false},{"connector_type":8,"signal_lines":1,"input":false},{"connector_type":8,"signal_lines":1,"input":false},{"connector_type":8,"signal_lines":2,"input":false},{"connector_type":8,"signal_lines":1,"input":false},{"connector_type":0,"signal_lines":1,"input":true},{"connector_type":0,"signal_lines":1,"input":true},{"connector_type":0,"signal_lines":1,"input":true},{"connector_type":0,"signal_lines":1,"input":true},{"connector_type":0,"signal_lines":1,"input":true},{"connector_type":0,"signal_lines":1,"input":true},{"connector_type":0,"signal_lines":1,"input":false},{"connector_type":0,"signal_lines":1,"input":false},{"connector_type":0,"signal_lines":1,"input":false},{"connector_type":0,"signal_lines":1,"input":false}]',
        '[{"max_connection_speed":100,"protocol":7,"power_over_ethernet":false},{"max_connection_speed":100,"protocol":7,"power_over_ethernet":false},{"max_connection_speed":100,"protocol":7,"power_over_ethernet":false}]',
        7,
        '96 kHz',
        '{"lower_voltage":100,"upper_voltage":240,"wattage":6.66,"max_wattage":16,"redundant":false,"input_connector":3,"output_connector":null}'
    );
CREATE TABLE `computer_item` (
    `id` integer NOT NULL PRIMARY KEY autoincrement,
    `cpu_processor` text NOT NULL,
    `ram_size` integer NOT NULL,
    `total_storage` integer NOT NULL,
    `model_year` text NULL,
    `operating_system` text NULL,
    `dedicated_graphics` integer NOT NULL,
    `network_connectivity` JSON NULL,
    `computer_ports` JSON NULL,
    `power` JSON NULL
);
INSERT INTO computer_item
VALUES(
        1,
        '3.6GHz quad-core Intel Core i3',
        8,
        128,
        '2018',
        'macOS',
        0,
        '[{"max_connection_speed":100,"protocol":7,"power_over_ethernet":false}]',
        '[{"port_type":3,"number_of_ports":1,"front_port":false,"version":"1.4"},{"port_type":10,"number_of_ports":4,"front_port":false},{"port_type":0,"number_of_ports":2,"front_port":false}]',
        '{"lower_voltage":100,"upper_voltage":240,"wattage":70,"max_wattage":150,"redundant":false,"input_connector":1}'
    );
CREATE TABLE `console_item` (
    `id` integer NOT NULL PRIMARY KEY autoincrement,
    `total_inputs` integer NOT NULL,
    `total_outputs` integer NOT NULL,
    `total_busses` integer NOT NULL,
    `physical_inputs` integer NOT NULL,
    `physical_outputs` integer NOT NULL,
    `aux_inputs` integer NOT NULL,
    `physical_aux_inputs` integer NOT NULL,
    `phantom_power_inputs` integer NOT NULL,
    `faders` integer NOT NULL,
    `motorized` integer NOT NULL,
    `midi` integer NOT NULL,
    `protocol_inputs` integer NULL,
    `signal_protocol` integer NOT NULL,
    `can_expand` integer NULL DEFAULT NULL,
    `max_sample_rate` text CHECK (
        `max_sample_rate` in (
            '44.1 kHz',
            '48 kHz',
            '96 kHz'
        )
    ) NOT NULL,
    `power` JSON NULL
);
INSERT INTO console_item
VALUES(
        1,
        64,
        64,
        16,
        32,
        16,
        0,
        0,
        32,
        34,
        1,
        1,
        64,
        0,
        1,
        '44.1 kHz',
        '{"lower_voltage":100,"upper_voltage":240,"wattage":2,"max_wattage":1.2,"redundant":false,"input_connector":0,"output_connector":null}'
    );
CREATE TABLE `microphone_item` (
    `id` integer NOT NULL PRIMARY KEY autoincrement,
    `max_spl` integer NOT NULL,
    `phantom` integer NULL,
    `low_cut` integer NULL,
    `pad` integer NULL,
    `diaphragm_size` integer NULL,
    `output_impedance` integer NULL,
    `frequency_response` text NULL,
    `connector` integer NOT NULL,
    `microphone_type` text NOT NULL
);
INSERT INTO microphone_item
VALUES(
        1,
        142,
        1,
        NULL,
        0,
        NULL,
        30,
        '20Hz - 20kHz',
        0,
        '0'
    );
CREATE TABLE `monitoring_item` (
    `id` integer NOT NULL PRIMARY KEY autoincrement,
    `distro` integer NULL,
    `network_connectivity` JSON NULL,
    `physical_connectivity` JSON NULL,
    `power` JSON NULL
);
INSERT INTO monitoring_item
VALUES(
        1,
        1,
        '[{"port_identifier":"Network","max_connection_speed":1000,"protocol":7,"power_over_ethernet":false},{"port_identifier":"A-Net In","max_connection_speed":1000,"protocol":6,"power_over_ethernet":false},{"port_identifier":"A-Net Out","max_connection_speed":1000,"protocol":6,"power_over_ethernet":false},{"port_identifier":"A-Net Mixes","max_connection_speed":1000,"protocol":6,"power_over_ethernet":false},{"port_identifier":"Dante Primary","max_connection_speed":1000,"protocol":0,"power_over_ethernet":false},{"port_identifier":"Dante Secondary","max_connection_speed":1000,"protocol":0,"power_over_ethernet":false},{"port_identifier":"A-Net 1","max_connection_speed":1000,"protocol":6,"power_over_ethernet":true},{"port_identifier":"A-Net 2","max_connection_speed":1000,"protocol":6,"power_over_ethernet":true},{"port_identifier":"A-Net 3","max_connection_speed":1000,"protocol":6,"power_over_ethernet":true},{"port_identifier":"A-Net 3","max_connection_speed":1000,"protocol":6,"power_over_ethernet":true},{"port_identifier":"A-Net 4","max_connection_speed":1000,"protocol":6,"power_over_ethernet":true},{"port_identifier":"A-Net 5","max_connection_speed":1000,"protocol":6,"power_over_ethernet":true},{"port_identifier":"A-Net 6","max_connection_speed":1000,"protocol":6,"power_over_ethernet":true},{"port_identifier":"A-Net 7","max_connection_speed":1000,"protocol":6,"power_over_ethernet":true},{"port_identifier":"A-Net 8","max_connection_speed":1000,"protocol":6,"power_over_ethernet":true}]',
        NULL,
        '{"lower_voltage":100,"upper_voltage":240,"wattage":300,"max_wattage":300,"redundant":false,"input_connector":0}'
    );
CREATE TABLE `network_item` (
    `id` integer NOT NULL PRIMARY KEY autoincrement,
    `network_type` integer NOT NULL,
    `poe_ports` integer NOT NULL,
    `max_speed` integer NOT NULL,
    `fiber` integer NULL,
    `network_connectivity` JSON NULL,
    `power` JSON NULL
);
CREATE TABLE `processing_item` (
    `id` integer NOT NULL PRIMARY KEY autoincrement,
    `total_inputs` integer NOT NULL,
    `total_outputs` integer NOT NULL,
    `physical_inputs` integer NOT NULL,
    `physical_outputs` integer NOT NULL,
    `midi` integer NULL,
    `protocol_inputs` integer NULL,
    `signal_protocol` integer NOT NULL,
    `max_sample_rate` text CHECK (
        `max_sample_rate` in (
            '44.1 kHz',
            '48 kHz',
            '96 kHz'
        )
    ) NOT NULL,
    `network_connectivity` JSON NULL,
    `physical_connectivity` JSON NULL,
    `power` JSON NULL
);
INSERT INTO processing_item
VALUES(
        1,
        8,
        16,
        8,
        16,
        0,
        24,
        3,
        '96 kHz',
        '[{"port_identifier":"AVB A","max_connection_speed":1000,"protocol":3,"power_over_ethernet":false},{"port_identifier":"AVB B","max_connection_speed":1000,"protocol":3,"power_over_ethernet":false}]',
        '[{"port_identifier":"A","connector_type":1,"signal_lines":2,"input":true},{"port_identifier":"B","connector_type":0,"signal_lines":1,"input":true},{"port_identifier":"C","connector_type":1,"signal_lines":2,"input":true},{"port_identifier":"D","connector_type":0,"signal_lines":1,"input":true},{"port_identifier":"E","connector_type":1,"signal_lines":2,"input":true},{"port_identifier":"F","connector_type":0,"signal_lines":1,"input":true},{"port_identifier":"G","connector_type":1,"signal_lines":2,"input":true},{"port_identifier":"H","connector_type":0,"signal_lines":1,"input":true},{"port_identifier":"Analog Out 1","connector_type":0,"signal_lines":1,"input":false},{"port_identifier":"Analog Out 2","connector_type":0,"signal_lines":1,"input":false},{"port_identifier":"Analog Out 3","connector_type":0,"signal_lines":1,"input":false},{"port_identifier":"Analog Out 4","connector_type":0,"signal_lines":1,"input":false},{"port_identifier":"Analog Out 5","connector_type":0,"signal_lines":1,"input":false},{"port_identifier":"Analog Out 6","connector_type":0,"signal_lines":1,"input":false},{"port_identifier":"Analog Out 7","connector_type":0,"signal_lines":1,"input":false},{"port_identifier":"Analog Out 8","connector_type":0,"signal_lines":1,"input":false},{"port_identifier":"Analog Out 9","connector_type":0,"signal_lines":1,"input":false},{"port_identifier":"Analog Out 10","connector_type":0,"signal_lines":1,"input":false},{"port_identifier":"Analog Out 11","connector_type":0,"signal_lines":1,"input":false},{"port_identifier":"Analog Out 12","connector_type":0,"signal_lines":1,"input":false},{"port_identifier":"Analog Out 13","connector_type":0,"signal_lines":1,"input":false},{"port_identifier":"Analog Out 14","connector_type":0,"signal_lines":1,"input":false},{"port_identifier":"Analog Out 15","connector_type":0,"signal_lines":1,"input":false},{"port_identifier":"Analog Out 16","connector_type":0,"signal_lines":1,"input":false}]',
        '{"lower_voltage":5,"upper_voltage":5,"wattage":0.5,"max_wattage":1,"redundant":true,"input_connector":3,"output_connector":3}'
    );
CREATE TABLE `rfitem` (
    `id` integer NOT NULL PRIMARY KEY autoincrement,
    `physical_range` integer NOT NULL,
    `lower_frequency_response` integer NOT NULL,
    `upper_frequency_response` integer NOT NULL,
    `transmitter` JSON NULL,
    `reciever` JSON NULL
);
CREATE TABLE `rfband` (
    `id` integer NOT NULL PRIMARY KEY autoincrement,
    `rf_item_id` integer NOT NULL,
    `band_name` text NOT NULL,
    `lower_frequency_range` integer NOT NULL,
    `upper_frequency_range` integer NOT NULL,
    `manufacturer` text NOT NULL,
    `nation_code` text CHECK (
        `nation_code` in (
            'Afghanistan',
            'Åland Islands',
            'Albania',
            'Algeria',
            'American Samoa',
            'AndorrA',
            'Angola',
            'Anguilla',
            'Antarctica',
            'Antigua and Barbuda',
            'Argentina',
            'Armenia',
            'Aruba',
            'Australia',
            'Austria',
            'Azerbaijan',
            'Bahamas',
            'Bahrain',
            'Bangladesh',
            'Barbados',
            'Belarus',
            'Belgium',
            'Belize',
            'Benin',
            'Bermuda',
            'Bhutan',
            'Bolivia',
            'Bosnia and Herzegovina',
            'Botswana',
            'Bouvet Island',
            'Brazil',
            'British Indian Ocean Territory',
            'Brunei Darussalam',
            'Bulgaria',
            'Burkina Faso',
            'Burundi',
            'Cambodia',
            'Cameroon',
            'Canada',
            'Cape Verde',
            'Cayman Islands',
            'Central African Republic',
            'Chad',
            'Chile',
            'China',
            'Christmas Island',
            'Cocos (Keeling) Islands',
            'Colombia',
            'Comoros',
            'Congo',
            'Congo, The Democratic Republic of the',
            'Cook Islands',
            'Costa Rica',
            'Cote D''Ivoire',
            'Croatia',
            'Cuba',
            'Cyprus',
            'Czech Republic',
            'Denmark',
            'Djibouti',
            'Dominica',
            'Dominican Republic',
            'Ecuador',
            'Egypt',
            'El Salvador',
            'Equatorial Guinea',
            'Eritrea',
            'Estonia',
            'Ethiopia',
            'Falkland Islands (Malvinas)',
            'Faroe Islands',
            'Fiji',
            'Finland',
            'France',
            'French Guiana',
            'French Polynesia',
            'French Southern Territories',
            'Gabon',
            'Gambia',
            'Georgia',
            'Germany',
            'Ghana',
            'Gibraltar',
            'Greece',
            'Greenland',
            'Grenada',
            'Guadeloupe',
            'Guam',
            'Guatemala',
            'Guernsey',
            'Guinea',
            'Guinea-Bissau',
            'Guyana',
            'Haiti',
            'Heard Island and Mcdonald Islands',
            'Holy See (Vatican City State)',
            'Honduras',
            'Hong Kong',
            'Hungary',
            'Iceland',
            'India',
            'Indonesia',
            'Iran, Islamic Republic Of',
            'Iraq',
            'Ireland',
            'Isle of Man',
            'Israel',
            'Italy',
            'Jamaica',
            'Japan',
            'Jersey',
            'Jordan',
            'Kazakhstan',
            'Kenya',
            'Kiribati',
            'Korea, Democratic People''s Republic of',
            'Korea, Republic of',
            'Kuwait',
            'Kyrgyzstan',
            'Lao People''s Democratic Republic',
            'Latvia',
            'Lebanon',
            'Lesotho',
            'Liberia',
            'Libyan Arab Jamahiriya',
            'Liechtenstein',
            'Lithuania',
            'Luxembourg',
            'Macao',
            'Macedonia, The Former Yugoslav Republic of',
            'Madagascar',
            'Malawi',
            'Malaysia',
            'Maldives',
            'Mali',
            'Malta',
            'Marshall Islands',
            'Martinique',
            'Mauritania',
            'Mauritius',
            'Mayotte',
            'Mexico',
            'Micronesia, Federated States of',
            'Moldova, Republic of',
            'Monaco',
            'Mongolia',
            'Montserrat',
            'Morocco',
            'Mozambique',
            'Myanmar',
            'Namibia',
            'Nauru',
            'Nepal',
            'Netherlands',
            'Netherlands Antilles',
            'New Caledonia',
            'New Zealand',
            'Nicaragua',
            'Niger',
            'Nigeria',
            'Niue',
            'Norfolk Island',
            'Northern Mariana Islands',
            'Norway',
            'Oman',
            'Pakistan',
            'Palau',
            'Palestinian Territory, Occupied',
            'Panama',
            'Papua New Guinea',
            'Paraguay',
            'Peru',
            'Philippines',
            'Pitcairn',
            'Poland',
            'Portugal',
            'Puerto Rico',
            'Qatar',
            'Reunion',
            'Romania',
            'Russian Federation',
            'RWANDA',
            'Saint Helena',
            'Saint Kitts and Nevis',
            'Saint Lucia',
            'Saint Pierre and Miquelon',
            'Saint Vincent and the Grenadines',
            'Samoa',
            'San Marino',
            'Sao Tome and Principe',
            'Saudi Arabia',
            'Senegal',
            'Serbia and Montenegro',
            'Seychelles',
            'Sierra Leone',
            'Singapore',
            'Slovakia',
            'Slovenia',
            'Solomon Islands',
            'Somalia',
            'South Africa',
            'South Georgia and the South Sandwich Islands',
            'Spain',
            'Sri Lanka',
            'Sudan',
            'Suriname',
            'Svalbard and Jan Mayen',
            'Swaziland',
            'Sweden',
            'Switzerland',
            'Syrian Arab Republic',
            'Taiwan, Province of China',
            'Tajikistan',
            'Tanzania, United Republic of',
            'Thailand',
            'Timor-Leste',
            'Togo',
            'Tokelau',
            'Tonga',
            'Trinidad and Tobago',
            'Tunisia',
            'Turkey',
            'Turkmenistan',
            'Turks and Caicos Islands',
            'Tuvalu',
            'Uganda',
            'Ukraine',
            'United Arab Emirates',
            'United Kingdom',
            'United States',
            'United States Minor Outlying Islands',
            'Uruguay',
            'Uzbekistan',
            'Vanuatu',
            'Venezuela',
            'Viet Nam',
            'Virgin Islands, British',
            'Virgin Islands, U.S.',
            'Wallis and Futuna',
            'Western Sahara',
            'Yemen',
            'Zambia',
            'Zimbabwe'
        )
    ) NOT NULL,
    `deprecated` integer NOT NULL,
    CONSTRAINT `rfband_rf_item_id_foreign` FOREIGN key(`rf_item_id`) REFERENCES `rfitem`(`id`) ON UPDATE CASCADE
);
CREATE TABLE `speaker_item` (
    `id` integer NOT NULL PRIMARY KEY autoincrement,
    `driver` JSON NOT NULL,
    `built_in_processing` integer NOT NULL,
    `wireless` integer NOT NULL,
    `max_spl` integer NOT NULL,
    `power` JSON NOT NULL,
    `lower_frequency_response` integer NOT NULL,
    `upper_frequency_response` integer NOT NULL,
    `mounting_options` text NOT NULL,
    `physical_connectivity` JSON NULL,
    `network_connectivity` JSON NULL
);
CREATE TABLE `item` (
    `id` integer NOT NULL PRIMARY KEY autoincrement,
    `created_at` datetime NOT NULL DEFAULT 'NOW()',
    `updated_at` datetime NOT NULL,
    `public_notes` text NULL,
    `cost` DOUBLE NULL,
    `weight` DOUBLE NULL,
    `dimensions` JSON NULL,
    `model` text NOT NULL,
    `category` integer NOT NULL,
    `amplifier_id` integer NULL,
    `console_id` integer NULL,
    `computer_id` integer NULL,
    `processor_id` integer NULL,
    `network_item_id` integer NULL,
    `microphone_id` integer NULL,
    `radio_item_id` integer NULL,
    `speaker_item_id` integer NULL,
    `monitoring_item_id` integer NULL,
    `searchable_model` text NULL,
    `notes` text NULL,
    CONSTRAINT `item_amplifier_id_foreign` FOREIGN key(`amplifier_id`) REFERENCES `amplifier_item`(`id`) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT `item_console_id_foreign` FOREIGN key(`console_id`) REFERENCES `console_item`(`id`) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT `item_computer_id_foreign` FOREIGN key(`computer_id`) REFERENCES `computer_item`(`id`) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT `item_processor_id_foreign` FOREIGN key(`processor_id`) REFERENCES `processing_item`(`id`) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT `item_network_item_id_foreign` FOREIGN key(`network_item_id`) REFERENCES `network_item`(`id`) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT `item_microphone_id_foreign` FOREIGN key(`microphone_id`) REFERENCES `microphone_item`(`id`) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT `item_radio_item_id_foreign` FOREIGN key(`radio_item_id`) REFERENCES `rfitem`(`id`) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT `item_speaker_item_id_foreign` FOREIGN key(`speaker_item_id`) REFERENCES `speaker_item`(`id`) ON DELETE
    SET NULL ON UPDATE CASCADE,
        CONSTRAINT `item_monitoring_item_id_foreign` FOREIGN key(`monitoring_item_id`) REFERENCES `monitoring_item`(`id`) ON DELETE
    SET NULL ON UPDATE CASCADE
);
INSERT INTO item
VALUES(
        1,
        1670467256656,
        1670467256656,
        '',
        620.00000000000001776,
        0.95,
        NULL,
        '4099 Core',
        8,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        1,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );
INSERT INTO item
VALUES(
        2,
        1670467263788,
        1670467263788,
        '',
        2000.0,
        11.999999999999999644,
        '{"width":19,"length":14.25,"height":3.5,"rack_unit":2}',
        'D800-Dante A-Net Distro',
        2,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        1,
        NULL,
        NULL
    );
INSERT INTO item
VALUES(
        3,
        1670467266478,
        1670467266478,
        'null',
        8000.0,
        8.0,
        '{"width":300,"length":400,"height":800,"rack_unit":2}',
        'Galaxy 816',
        1,
        NULL,
        NULL,
        NULL,
        1,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        'AVB Ports also acts as a IP connection to a network.'
    );
INSERT INTO item
VALUES(
        4,
        1670467269584,
        1670467269584,
        '',
        47999.999999999998223,
        48.100000000000004973,
        '{"width":32.6,"length":22.2,"height":10.7,"rack_unit":null}',
        'QL5',
        0,
        NULL,
        1,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );
INSERT INTO item
VALUES(
        5,
        1670467272626,
        1670467272626,
        '',
        2000.0,
        23.799999999999998934,
        '{"width":19,"length":18.1,"height":3.5,"rack_unit":2}',
        'D20',
        4,
        1,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );
INSERT INTO item
VALUES(
        6,
        1670467277347,
        1670467277347,
        '',
        800.0,
        2.9,
        '{"width":7.7,"length":7.7,"height":1.4}',
        'Mac Mini 2018',
        5,
        NULL,
        NULL,
        1,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL,
        NULL
    );
DELETE FROM sqlite_sequence;
INSERT INTO sqlite_sequence
VALUES('microphone_item', 1);
INSERT INTO sqlite_sequence
VALUES('item', 6);
INSERT INTO sqlite_sequence
VALUES('monitoring_item', 1);
INSERT INTO sqlite_sequence
VALUES('processing_item', 1);
INSERT INTO sqlite_sequence
VALUES('console_item', 1);
INSERT INTO sqlite_sequence
VALUES('amplifier_item', 1);
INSERT INTO sqlite_sequence
VALUES('computer_item', 1);
CREATE INDEX `rfband_rf_item_id_index` ON `rfband` (`rf_item_id`);
CREATE UNIQUE INDEX `rfband_band_name_unique` ON `rfband` (`band_name`);
CREATE UNIQUE INDEX `item_model_unique` ON `item` (`model`);
CREATE UNIQUE INDEX `item_amplifier_id_unique` ON `item` (`amplifier_id`);
CREATE UNIQUE INDEX `item_console_id_unique` ON `item` (`console_id`);
CREATE UNIQUE INDEX `item_computer_id_unique` ON `item` (`computer_id`);
CREATE UNIQUE INDEX `item_processor_id_unique` ON `item` (`processor_id`);
CREATE UNIQUE INDEX `item_network_item_id_unique` ON `item` (`network_item_id`);
CREATE UNIQUE INDEX `item_microphone_id_unique` ON `item` (`microphone_id`);
CREATE UNIQUE INDEX `item_radio_item_id_unique` ON `item` (`radio_item_id`);
CREATE UNIQUE INDEX `item_speaker_item_id_unique` ON `item` (`speaker_item_id`);
CREATE UNIQUE INDEX `item_monitoring_item_id_unique` ON `item` (`monitoring_item_id`);
COMMIT;