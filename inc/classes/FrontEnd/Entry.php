<?php

declare(strict_types=1);

namespace J7\WpRefinePlugin\FrontEnd;

use J7\WpRefinePlugin\Utils\Base;

if (class_exists('J7\WpRefinePlugin\FrontEnd\Entry')) {
	return;
}
/** Class FrontEnd */
final class Entry {

	/** Register hooks */
	public static function register_hooks(): void {
		\add_action( 'wp_footer', [ __CLASS__, 'render_app' ] );
	}

	/** Render application's markup */
	public static function render_app(): void {
		// phpcs:ignore
		echo '<div id="' . substr(Base::APP1_SELECTOR, 1) . '"></div>';
	}
}
