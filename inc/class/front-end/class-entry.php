<?php
/**
 * Front-end Entry
 */

declare(strict_types=1);

namespace J7\WpRefinePlugin\FrontEnd;

use Micropackage\Singleton\Singleton;
use J7\WpRefinePlugin\Utils\Base;

/**
 * Class FrontEnd
 */
final class Entry extends Singleton {

	/**
	 * Constructor
	 */
	public function __construct() {
		\add_action( 'wp_footer', array( $this, 'render_app' ) );
	}

	/**
	 * Render application's markup
	 */
	public function render_app(): void {
		// phpcs:ignore
		echo '<div id="' . Base::APP2_SELECTOR . '"></div>';
	}
}

Entry::get();
