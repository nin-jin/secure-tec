namespace $ {
	export class $tec_controller extends $hyoo_crowd_struct {
		
		soft_version() {
			return '0.1'
		}
		
		active( next?: boolean ) {
			return this.sub( 'active', $hyoo_crowd_reg ).bool( next )
		}
		
		update_status( next?: string ) {
			return this.sub( 'update_status', $hyoo_crowd_reg ).str( next )
		}
		
		value( next?: number ) {
			return this.sub( 'value', $hyoo_crowd_reg ).numb( next )
		}
		
		@ $mol_mem
		intent() {
			return this.yoke( 'intent', $tec_controller_intent, [ $tec_domain.id ] )
		}
		
	}
}
