<?php

declare(strict_types=1);

namespace J7\WpRefinePlugin\Admin;

use J7\WpRefinePlugin\Utils\Base;

if (class_exists('J7\WpRefinePlugin\Admin\CPT')) {
	return;
}
/** Class CPT */
final class CPT {

	const POST_TYPE = 'my-refine-app';

	/** Register hooks */
	public static function register_hooks() {
		\add_action( 'init', [ __CLASS__, 'register_cpt' ] );
		\add_action( 'load-post.php', [ __CLASS__, 'add_metabox' ] );
		\add_action( 'load-post-new.php', [ __CLASS__, 'add_metabox' ] );
	}

	/**
	 * Register my-refine-app custom post type
	 */
	public static function register_cpt(): void {

		$labels = [
			'name'                     => \esc_html__( 'my-refine-app', 'wp_refine_plugin' ),
			'singular_name'            => \esc_html__( 'my-refine-app', 'wp_refine_plugin' ),
			'add_new'                  => \esc_html__( 'Add new', 'wp_refine_plugin' ),
			'add_new_item'             => \esc_html__( 'Add new item', 'wp_refine_plugin' ),
			'edit_item'                => \esc_html__( 'Edit', 'wp_refine_plugin' ),
			'new_item'                 => \esc_html__( 'New', 'wp_refine_plugin' ),
			'view_item'                => \esc_html__( 'View', 'wp_refine_plugin' ),
			'view_items'               => \esc_html__( 'View', 'wp_refine_plugin' ),
			'search_items'             => \esc_html__( 'Search my-refine-app', 'wp_refine_plugin' ),
			'not_found'                => \esc_html__( 'Not Found', 'wp_refine_plugin' ),
			'not_found_in_trash'       => \esc_html__( 'Not found in trash', 'wp_refine_plugin' ),
			'parent_item_colon'        => \esc_html__( 'Parent item', 'wp_refine_plugin' ),
			'all_items'                => \esc_html__( 'All', 'wp_refine_plugin' ),
			'archives'                 => \esc_html__( 'my-refine-app archives', 'wp_refine_plugin' ),
			'attributes'               => \esc_html__( 'my-refine-app attributes', 'wp_refine_plugin' ),
			'insert_into_item'         => \esc_html__( 'Insert to this my-refine-app', 'wp_refine_plugin' ),
			'uploaded_to_this_item'    => \esc_html__( 'Uploaded to this my-refine-app', 'wp_refine_plugin' ),
			'featured_image'           => \esc_html__( 'Featured image', 'wp_refine_plugin' ),
			'set_featured_image'       => \esc_html__( 'Set featured image', 'wp_refine_plugin' ),
			'remove_featured_image'    => \esc_html__( 'Remove featured image', 'wp_refine_plugin' ),
			'use_featured_image'       => \esc_html__( 'Use featured image', 'wp_refine_plugin' ),
			'menu_name'                => \esc_html__( 'my-refine-app', 'wp_refine_plugin' ),
			'filter_items_list'        => \esc_html__( 'Filter my-refine-app list', 'wp_refine_plugin' ),
			'filter_by_date'           => \esc_html__( 'Filter by date', 'wp_refine_plugin' ),
			'items_list_navigation'    => \esc_html__( 'my-refine-app list navigation', 'wp_refine_plugin' ),
			'items_list'               => \esc_html__( 'my-refine-app list', 'wp_refine_plugin' ),
			'item_published'           => \esc_html__( 'my-refine-app published', 'wp_refine_plugin' ),
			'item_published_privately' => \esc_html__( 'my-refine-app published privately', 'wp_refine_plugin' ),
			'item_reverted_to_draft'   => \esc_html__( 'my-refine-app reverted to draft', 'wp_refine_plugin' ),
			'item_scheduled'           => \esc_html__( 'my-refine-app scheduled', 'wp_refine_plugin' ),
			'item_updated'             => \esc_html__( 'my-refine-app updated', 'wp_refine_plugin' ),
		];
		$args   = [
			'label'                 => \esc_html__( 'my-refine-app', 'wp_refine_plugin' ),
			'labels'                => $labels,
			'description'           => '',
			'public'                => true,
			'hierarchical'          => false,
			'exclude_from_search'   => true,
			'publicly_queryable'    => true,
			'show_ui'               => true,
			'show_in_nav_menus'     => false,
			'show_in_admin_bar'     => false,
			'show_in_rest'          => true,
			'query_var'             => false,
			'can_export'            => true,
			'delete_with_user'      => true,
			'has_archive'           => false,
			'rest_base'             => '',
			'show_in_menu'          => true,
			'menu_position'         => 6,
			'menu_icon'             => 'dashicons-store',
			'capability_type'       => 'post',
			'supports'              => [ 'title', 'editor', 'thumbnail', 'custom-fields', 'author' ],
			'taxonomies'            => [],
			'rest_controller_class' => 'WP_REST_Posts_Controller',
			'rewrite'               => [
				'with_front' => true,
			],
		];

		\register_post_type( self::POST_TYPE, $args );
	}


	/**
	 * Adds the meta box.
	 *
	 * @param string $post_type Post type.
	 */
	public static function add_metabox( string $post_type ): void {
		$post_type = $post_type ?: $_GET['post_type']; // phpcs:ignore
		if ( in_array( $post_type, [ self::POST_TYPE ] ) ) {
			\add_meta_box(
				self::POST_TYPE . '-metabox',
				__( 'My Refine App', 'wp_refine_plugin' ),
				[ __CLASS__, 'render_meta_box' ],
				self::POST_TYPE,
				'advanced',
				'high'
			);
		}
	}

	/**
	 * Render meta box.
	 */
	public static function render_meta_box(): void {
		// phpcs:ignore
		echo '<div id="' . substr(Base::APP2_SELECTOR, 1) . '" class="relative"></div>';
	}
}
