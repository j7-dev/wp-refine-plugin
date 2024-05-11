<?php
/**
 * Plugin Name:       WP Refine Plugin (DEV)
 * Plugin URI:        https://github.com/j7-dev/wp-refine-plugin
 * Description:       WP Refine Plugin is a boilerplate for creating a WordPress plugin with React, Tailwind, TypeScript, React Query v4, SCSS and Vite.
 * Version:           3.0.2
 * Requires at least: 5.7
 * Requires PHP:      7.4
 * Author:            J7
 * Author URI:        https://github.com/j7-dev
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wp-refine-plugin
 * Domain Path:       /languages
 * Tags: vite, react, tailwind, typescript, react-query, scss, WordPress, WordPress plugin, refine
 */

declare (strict_types = 1);

namespace J7\WpRefinePlugin;

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;
use Micropackage\Singleton\Singleton;
use TGM_Plugin_Activation;

if ( ! \class_exists( 'J7\WpRefinePlugin\Plugin' ) ) {
	require_once __DIR__ . '/vendor/autoload.php';

	/**
		* Class Plugin
		*/
	final class Plugin extends Singleton {

		const APP_NAME    = 'My Refine App';
		const KEBAB       = 'my-refine-app';
		const SNAKE       = 'my_refine_app';
		const GITHUB_REPO = 'https://github.com/j7-dev/wp-refine-plugin';

		/**
		 * Plugin Update Checker Personal Access Token
		 *
		 * @var string
		 */
		public static $puc_pat;

		/**
		 * Plugin Directory
		 *
		 * @var string
		 */
		public static $dir;

		/**
		 * Plugin URL
		 *
		 * @var string
		 */
		public static $url;

		/**
		 * Plugin Version
		 *
		 * @var string
		 */
		public static $version;

		/**
		 * Instance
		 *
		 * @var Plugin
		 */
		private static $instance;

		/**
		 * Required plugins
		 *
		 * @var array
		 */
		public $required_plugins = array(
			// array(
			// 'name'     => 'WooCommerce',
			// 'slug'     => 'woocommerce',
			// 'required' => true,
			// 'version'  => '7.6.0',
			// ),
			// array(
			// 'name'     => 'WP Toolkit',
			// 'slug'     => 'wp-toolkit',
			// 'source'   => 'https://github.com/j7-dev/wp-toolkit/releases/latest/download/wp-toolkit.zip',
			// 'required' => true,
			// ),
		);

		/**
		 * Constructor
		 */
		public function __construct() {
			require_once __DIR__ . '/inc/class/class-bootstrap.php';

			\register_activation_hook( __FILE__, array( $this, 'activate' ) );
			\register_deactivation_hook( __FILE__, array( $this, 'deactivate' ) );
			\add_action( 'tgmpa_register', array( $this, 'register_required_plugins' ) );
			\add_action( 'plugins_loaded', array( $this, 'check_required_plugins' ) );

			$this->set_puc_pat();
			$this->plugin_update_checker();
		}

		/**
		 * Check required plugins
		 *
		 * @return void
		 */
		public function check_required_plugins() {
			$instance          = TGM_Plugin_Activation::get_instance();
			$is_tgmpa_complete = $instance->is_tgmpa_complete();

			if ( $is_tgmpa_complete ) {
				self::$dir = \untrailingslashit( \wp_normalize_path( \plugin_dir_path( __FILE__ ) ) );
				self::$url = \untrailingslashit( \plugin_dir_url( __FILE__ ) );
				if ( ! \function_exists( 'get_plugin_data' ) ) {
					require_once \ABSPATH . 'wp-admin/includes/plugin.php';
				}
				$plugin_data   = \get_plugin_data( __FILE__ );
				self::$version = $plugin_data['Version'];

				Bootstrap::get();
			}
		}

		/**
		 * Plugin update checker
		 * When you push a new release to Github, user will receive updates in wp-admin/plugins.php page
		 *
		 * @return void
		 */
		public function plugin_update_checker(): void {
			try {
				$update_checker = PucFactory::buildUpdateChecker(
					self::GITHUB_REPO,
					__FILE__,
					self::KEBAB
				);
				/**
				 * Type
				 *
				 * @var \Puc_v4p4_Vcs_PluginUpdateChecker $update_checker
				 */
				$update_checker->setBranch( 'master' );
				// if your repo is private, you need to set authentication
				// $update_checker->setAuthentication( self::$puc_pat );
				$update_checker->getVcsApi()->enableReleaseAssets();
			} catch ( \Throwable $th ) { // phpcs:ignore
				// throw $th;
			}
		}

		/**
		 * Register required plugins
		 *
		 * @return void
		 */
		public function register_required_plugins(): void {
			// phpcs:disable
			$config = array(
				'id'           => Plugin::KEBAB, // Unique ID for hashing notices for multiple instances of TGMPA.
				'default_path' => '', // Default absolute path to bundled plugins.
				'menu'         => 'tgmpa-install-plugins', // Menu slug.
				'parent_slug'  => 'plugins.php', // Parent menu slug.
				'capability'   => 'manage_options', // Capability needed to view plugin install page, should be a capability associated with the parent menu used.
				'has_notices'  => true, // Show admin notices or not.
				'dismissable'  => false, // If false, a user cannot dismiss the nag message.
				'dismiss_msg'  => __( '這個訊息將在依賴套件被安裝並啟用後消失。' . Plugin::APP_NAME . ' 沒有這些依賴套件的情況下將無法運作！', 'wp_refine_plugin' ), // If 'dismissable' is false, this message will be output at top of nag.
				'is_automatic' => true, // Automatically activate plugins after installation or not.
				'message'      => '', // Message to output right before the plugins table.
				'strings'      => array(
					'page_title'                      => __( '安裝依賴套件', 'wp_refine_plugin' ),
					'menu_title'                      => __( '安裝依賴套件', 'wp_refine_plugin' ),
					'installing'                      => __( '安裝套件: %s', 'wp_refine_plugin' ), // translators: %s: plugin name.
					'updating'                        => __( '更新套件: %s', 'wp_refine_plugin' ), // translators: %s: plugin name.
					'oops'                            => __( 'OOPS! plugin API 出錯了', 'wp_refine_plugin' ),
					'notice_can_install_required'     => _n_noop(
						// translators: 1: plugin name(s).
						Plugin::APP_NAME . ' 依賴套件: %1$s.',
						Plugin::APP_NAME . ' 依賴套件: %1$s.',
						'wp_refine_plugin'
					),
					'notice_can_install_recommended'  => _n_noop(
						// translators: 1: plugin name(s).
						Plugin::APP_NAME . ' 推薦套件: %1$s.',
						Plugin::APP_NAME . ' 推薦套件: %1$s.',
						'wp_refine_plugin'
					),
					'notice_ask_to_update'            => _n_noop(
						// translators: 1: plugin name(s).
						'以下套件需要更新到最新版本來兼容 ' . Plugin::APP_NAME . ': %1$s.',
						'以下套件需要更新到最新版本來兼容 ' . Plugin::APP_NAME . ': %1$s.',
						'wp_refine_plugin'
					),
					'notice_ask_to_update_maybe'      => _n_noop(
						// translators: 1: plugin name(s).
						'以下套件有更新: %1$s.',
						'以下套件有更新: %1$s.',
						'wp_refine_plugin'
					),
					'notice_can_activate_required'    => _n_noop(
						// translators: 1: plugin name(s).
						'以下依賴套件目前為停用狀態: %1$s.',
						'以下依賴套件目前為停用狀態: %1$s.',
						'wp_refine_plugin'
					),
					'notice_can_activate_recommended' => _n_noop(
						// translators: 1: plugin name(s).
						'以下推薦套件目前為停用狀態: %1$s.',
						'以下推薦套件目前為停用狀態: %1$s.',
						'wp_refine_plugin'
					),
					'install_link'                    => _n_noop(
						'安裝套件',
						'安裝套件',
						'wp_refine_plugin'
					),
					'update_link'                     => _n_noop(
						'更新套件',
						'更新套件',
						'wp_refine_plugin'
					),
					'activate_link'                   => _n_noop(
						'啟用套件',
						'啟用套件',
						'wp_refine_plugin'
					),
					'return'                          => __( '回到安裝依賴套件', 'wp_refine_plugin' ),
					'plugin_activated'                => __( '套件啟用成功', 'wp_refine_plugin' ),
					'activated_successfully'          => __( '以下套件已成功啟用:', 'wp_refine_plugin' ),
					// translators: 1: plugin name.
					'plugin_already_active'           => __( '沒有執行任何動作 %1$s 已啟用', 'wp_refine_plugin' ),
					// translators: 1: plugin name.
					'plugin_needs_higher_version'     => __( Plugin::APP_NAME . ' 未啟用。' . Plugin::APP_NAME . ' 需要新版本的 %s 。請更新套件。', 'wp_refine_plugin' ),
					// translators: 1: dashboard link.
					'complete'                        => __( '所有套件已成功安裝跟啟用 %1$s', 'wp_refine_plugin' ),
					'dismiss'                         => __( '關閉通知', 'wp_refine_plugin' ),
					'notice_cannot_install_activate'  => __( '有一個或以上的依賴/推薦套件需要安裝/更新/啟用', 'wp_refine_plugin' ),
					'contact_admin'                   => __( '請聯繫網站管理員', 'wp_refine_plugin' ),

					'nag_type'                        => 'error', // Determines admin notice type - can only be one of the typical WP notice classes, such as 'updated', 'update-nag', 'notice-warning', 'notice-info' or 'error'. Some of which may not work as expected in older WP versions.
				),
			);

			\tgmpa($this->required_plugins, $config );
		 }


		 /**
		 * Set Plugin Update Checker Personal Access Token
		 *
		 * @return array
		 */
		public static function set_puc_pat(): void{
			$env_file = __DIR__ . '/.puc_pat';

			// Check if .env file exists
			if ( file_exists( $env_file ) ) {
					// Read contents of .env file
					$env_contents = file_get_contents( $env_file );
					self::$puc_pat = trim($env_contents);
			}
		}

		/**
		   * Activate
		   *
		   * @return void
		   */
		public function activate(): void {
		 }

		/**
		   * Deactivate
		   *
		   * @return void
		   */
		public function deactivate(): void {
		 }
	 }

	 Plugin::get();
 }

