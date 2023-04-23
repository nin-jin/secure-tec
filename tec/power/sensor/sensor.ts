namespace $ {
	export class $tec_power_sensor extends $tec_controller {
		
		value( next?: number ) {
			return this.sub( 'value', $hyoo_crowd_reg ).numb( next )
		}
		
	}
}
