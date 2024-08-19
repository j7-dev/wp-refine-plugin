<?php
/**
 * Base
 */

declare (strict_types = 1);

namespace J7\WpRefinePlugin\Utils;

/**
 * Class Utils
 */
abstract class Base {
	const BASE_URL      = '/';
	const APP1_SELECTOR = '#my_refine_app';
	const APP2_SELECTOR = '#my_refine_app_metabox';
	const API_TIMEOUT   = '30000';
	const DEFAULT_IMAGE = 'http://1.gravatar.com/avatar/1c39955b5fe5ae1bf51a77642f052848?s=96&d=mm&r=g';
}
