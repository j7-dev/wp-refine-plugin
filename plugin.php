<?php
/**
 * Plugin Name:       WP Refine Plugin (DEV)
 * Plugin URI:        https://github.com/j7-dev/wp-refine-plugin
 * Description:       WP Refine Plugin is a boilerplate for creating a WordPress plugin with React, Tailwind, TypeScript, React Query v4, SCSS and Vite.
 * Version:           4.0.1
 * Requires at least: 5.7
 * Requires PHP:      7.4
 * Author:            J7
 * Author URI:        https://github.com/j7-dev
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp_refine_plugin
 * Domain Path:       /languages
 * Tags: vite, react, tailwind, typescript, react-query, scss, WordPress, WordPress plugin, refine
 */

declare (strict_types = 1);

namespace J7\WpRefinePlugin;

if (!defined('ABSPATH')) {
	exit; // Exit if accessed directly
}

if ( \class_exists( 'J7\WpRefinePlugin\Plugin' ) ) {
	return;
}
require_once __DIR__ . '/vendor/autoload.php';

/**
	* Class Plugin
	*/
final class Plugin {
	use \J7\WpUtils\Traits\PluginTrait;
	use \J7\WpUtils\Traits\SingletonTrait;

	/**
	 * Constructor
	 */
	public function __construct() {

		// self::$template_page_names = [ '404' ];

		$this->required_plugins = [
			// [
			// 'name'     => 'WooCommerce',
			// 'slug'     => 'woocommerce',
			// 'required' => true,
			// 'version'  => '7.6.0',
			// ],
			// [
			// 'name'     => 'Powerhouse',
			// 'slug'     => 'powerhouse',
			// 'source'   => 'https://github.com/j7-dev/wp-powerhouse/releases/latest/download/powerhouse.zip',
			// 'version'  => '2.0.14',
			// 'required' => true,
			// ],
		];

		$this->init(
			[
				'app_name'    => 'My Refine App',
				'github_repo' => 'https://github.com/j7-dev/wp-refine-plugin',
				'callback'    => [ Bootstrap::class, 'instance' ],
			]
		);
	}
}

Plugin::instance();
