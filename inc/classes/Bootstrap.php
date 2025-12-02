<?php

declare (strict_types = 1);

namespace J7\WpRefinePlugin;

use J7\WpRefinePlugin\Utils\Base;
use Kucrut\Vite;

if ( class_exists( 'J7\WpRefinePlugin\Bootstrap' ) ) {
	return;
}
/** Class Bootstrap */
final class Bootstrap {

	/** Register hooks */
	public static function register_hooks() {
		FrontEnd\Entry::register_hooks();
		Admin\CPT::register_hooks();

		\add_action( 'admin_enqueue_scripts', [ __CLASS__, 'admin_enqueue_script' ] );
		\add_action( 'wp_enqueue_scripts', [ __CLASS__, 'frontend_enqueue_script' ]);
	}

	/**
	 * Admin Enqueue script
	 * You can load the script on demand
	 *
	 * @param string $hook current page hook
	 *
	 * @return void
	 */
	public static function admin_enqueue_script( $hook ): void {
		self::enqueue_script();
	}

	/**
	 * Front-end Enqueue script
	 * You can load the script on demand
	 *
	 * @return void
	 */
	public static function frontend_enqueue_script(): void {
		self::enqueue_script();
	}


	/**
	 * Enqueue script
	 * You can load the script on demand
	 *
	 * @return void
	 */
	public static function enqueue_script(): void {

		Vite\enqueue_asset(
			Plugin::$dir . '/js/dist',
			'js/src/main.tsx',
			[
				'handle'    => Plugin::$kebab,
				'in-footer' => true,
			]
		);

		$post_id   = \get_the_ID();
		$permalink = $post_id ? \get_permalink( $post_id ) : '';

		/** @var array<string> $active_plugins */
		$active_plugins = \get_option( 'active_plugins', [] );

		$env = [
			'SITE_URL'          => \untrailingslashit( \site_url() ),
			'API_URL'           => \untrailingslashit( \esc_url_raw( rest_url() ) ),
			'CURRENT_USER_ID'   => \get_current_user_id(),
			'CURRENT_POST_ID'   => $post_id,
			'PERMALINK'         => \untrailingslashit( $permalink ),
			'APP_NAME'          => Plugin::$app_name,
			'KEBAB'             => Plugin::$kebab,
			'SNAKE'             => Plugin::$snake,
			'NONCE'             => \wp_create_nonce( 'wp_rest' ),
			'APP1_SELECTOR'     => Base::APP1_SELECTOR,
			'APP2_SELECTOR'     => Base::APP2_SELECTOR,
			'ELEMENTOR_ENABLED' => \in_array( 'elementor/elementor.php', $active_plugins, true ), // 檢查 elementor 是否啟用
		];

		\wp_localize_script(
			Plugin::$kebab,
			Plugin::$snake . '_data',
			[
				'env' => $env,
			]
		);
	}
}
