<?php
namespace O10n;

/**
 * PWA Optimization Admin Controller
 *
 * @package    optimization
 * @subpackage optimization/controllers/admin
 * @author     Optimization.Team <info@optimization.team>
 */
if (!defined('ABSPATH')) {
    exit;
}

class AdminPwa extends ModuleAdminController implements Module_Admin_Controller_Interface
{
    protected $admin_base = 'tools.php';

    // tab menu
    protected $tabs = array(
        'intro' => array(
            'title' => '<span class="dashicons dashicons-admin-home"></span>',
            'title_attr' => 'Intro'
        ),
        'serviceworker' => array(
            'title' => 'Service Worker'
        ),
        'manifest' => array(
            'title' => 'Web App Manifest'
        )
    );
    /**
     * Load controller
     *
     * @param  Core       $Core Core controller instance.
     * @return Controller Controller instance.
     */
    public static function &load(Core $Core)
    {
        // instantiate controller
        return parent::construct($Core, array(
            'AdminView'
        ));
    }

    /**
     * Setup controller
     */
    protected function setup()
    {
        // settings link on plugin index
        add_filter('plugin_action_links_' . $this->core->modules('pwa')->basename(), array($this, 'settings_link'));

        // meta links on plugin index
        add_filter('plugin_row_meta', array( $this, 'plugin_row_meta' ), 10, 2);

        // title on plugin index
        add_action('pre_current_active_plugins', array( $this, 'plugin_title'), 10);

        // admin options page
        add_action('admin_menu', array($this, 'admin_menu'), 50);

        // upgrade/install hooks
        $this->upgrade();
    }
    
    /**
     * Admin menu option
     */
    public function admin_menu()
    {
        global $submenu;

        // WPO plugin or more than 1 optimization module, add to optimization menu
        if (defined('O10N_WPO_VERSION') || count($this->core->modules()) > 1) {
            add_submenu_page('o10n', __('PWA Optimization', 'o10n'), __('PWA', 'o10n'), 'manage_options', 'o10n-pwa', array(
                 &$this->AdminView,
                 'display'
             ));

            // change base to admin.php
            $this->admin_base = 'admin.php';
        } else {

        // add menu entry
            add_submenu_page('tools.php', __('PWA Optimization', 'o10n'), __('PWA Optimization', 'o10n'), 'manage_options', 'o10n-pwa', array(
                 &$this->AdminView,
                 'display'
             ));
        }
    }

    /**
     * Settings link on plugin overview.
     *
     * @param  array $links Plugin settings links.
     * @return array Modified plugin settings links.
     */
    final public function settings_link($links)
    {
        $settings_link = '<a href="'.esc_url(add_query_arg(array('page' => 'o10n-pwa','tab' => 'serviceworker'), admin_url($this->admin_base))).'">'.__('Settings').'</a>';
        array_unshift($links, $settings_link);

        return $links;
    }

    /**
     * Return help tab data
     */
    final public function help_tab()
    {
        $data = array(
            'name' => __('PWA Optimization', 'o10n'),
            'github' => 'https://github.com/o10n-x/wordpress-pwa-optimization',
            'wordpress' => 'https://wordpress.org/support/plugin/pwa-optimization',
            'docs' => 'https://github.com/o10n-x/wordpress-pwa-optimization/tree/master/docs'
        );

        return $data;
    }

    /**
     * Show row meta on the plugin screen.
     */
    final public function plugin_row_meta($links, $file)
    {
        if ($file == $this->core->modules('pwa')->basename()) {
            $lgcode = strtolower(get_locale());
            if (strpos($lgcode, '_') !== false) {
                $lgparts = explode('_', $lgcode);
                $lgcode = $lgparts[0];
            }
            if ($lgcode === 'en') {
                $lgcode = '';
            }
            
            $plugin_links = $this->help_tab();

            if ($plugin_links && isset($plugin_links['github'])) {
                $row_meta = array(
                    'o10n_version' => '<a href="'.trailingslashit($plugin_links['github']).'releases/" target="_blank" title="' . esc_attr(__('View Version History', 'o10n')) . '" style=""><span class="dashicons dashicons-clock"></span> ' . __('Version History', 'o10n') . '</a>'
                );
            }

            return array_merge($links, $row_meta);
        }

        return (array) $links;
    }

    /**
     * Plugin title modification
     */
    public function plugin_title()
    {
        ?><script>jQuery(function($){var r=$('*[data-plugin="<?php print $this->core->modules('pwa')->basename(); ?>"]');
            $('.plugin-title strong',r).html('<?php print $this->core->modules('pwa')->name(); ?><a href="https://optimization.team" class="g100" style="font-size: 10px;float: right;font-weight: normal;opacity: .2;line-height: 14px;">O10N</span>');
            var d=$('.plugin-description',r).html();$('.plugin-description',r).html(d.replace('Google PageSpeed','<a href="https://developers.google.com/speed/pagespeed/insights/" target="_blank">Google PageSpeed</a>').replace('Google Lighthouse','<a href="https://developers.google.com/web/tools/lighthouse/" target="_blank">Google Lighthouse</a>').replace('ThinkWithGoogle.com','<a href="https://testmysite.thinkwithgoogle.com/" target="_blank">ThinkWithGoogle.com</a>').replace('Excellent','<span style="font-style:italic;color:#079c2d;">Excellent</span>'));
});</script><?php
    }
    
    /**
     * Upgrade plugin
     */
    final public function upgrade()
    {

        // set current version
        $current_version = get_option('o10n_pwa_version', false);
        $version = $this->core->modules('pwa')->version();

        if ($current_version === false || version_compare($current_version, '0.0.39', '<=')) {
            $admin_path = trailingslashit(ABSPATH) . 'wp-admin/';
            $sw_filename = 'o10n-sw.js';
            $sw_filename_debug = 'o10n-sw.debug.js';
            $sw_worker_filename = 'o10n-sw-worker.js';
            $sw_worker_filename_debug = 'o10n-sw-worker.debug.js';
            $sw_hash_filename = 'o10n-sw-hash.txt';
            $sw_hash_filename_debug = 'o10n-sw-hash.debug.txt';

            // remove Service Worker files from wp-admin/ directory
            $sw_files = array(
                $admin_path . $sw_filename,
                $admin_path . $sw_worker_filename,
                $admin_path . $sw_filename_debug,
                $admin_path . $sw_worker_filename_debug,
                $admin_path . $sw_hash_filename
            );
            foreach ($sw_files as $file) {
                if (file_exists($file)) {
                    @unlink($file);
                }
            }

            update_option('o10n_pwa_version', $version, false);
        }
    }
}
