namespace $ {
	export class $tec_controller_intent extends $hyoo_crowd_struct {
		
		active( next?: boolean ) {
			return this.sub( 'active', $hyoo_crowd_reg ).bool( next )
		}
		
		value( next?: number ) {
			return this.sub( 'value', $hyoo_crowd_reg ).numb( next )
		}
		
	}
}
