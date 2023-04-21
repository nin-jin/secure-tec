namespace $.$$ {
	export class $tec_power_service extends $.$tec_power_service {
		
		@ $mol_mem
		receive( reset?: null ) {
			
			const model = this.Model()
			if( !model.active() ) return
			
			new this.$.$mol_after_timeout( 100, ()=> this.receive( null ) )
			
			const cur = this.Model().value()
			const tar = this.Model().intent()?.value() ?? cur
			
			const next = cur + ( tar - cur ) / 10 + Math.random() / 100
			model.value( next )
			
		}
		
	}
}
