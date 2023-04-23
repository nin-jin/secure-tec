namespace $.$$ {
	export class $tec_power_sensor_service extends $.$tec_power_sensor_service {
		
		@ $mol_mem
		Model() {
			return this.yard().world().Fund( $tec_power_sensor ).Item( this.Peer().id )
		}
		
		@ $mol_mem
		receive() {
			if( !this.Model().active() ) return
			$mol_wire_watch()
			this.value( 100 + Math.random() )
		}
		
	}
}
