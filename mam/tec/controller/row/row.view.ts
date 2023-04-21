namespace $.$$ {
	export class $tec_controller_row extends $.$tec_controller_row {
		
		Intent() {
			return this.Model().intent()!
		}
		
		intentable() {
			return this.Intent().land.allowed_mod()
		}
		
		@ $mol_mem
		value_changed( next = this.value_intent() ) {
			return next
		}
		
		value_submit() {
			this.value_intent( this.value_changed() )
		}
		
		value_current_pretty() {
			return this.value_current().toFixed( 2 )
		}
		
		active_current_pretty() {
			return this.active_current() ? '🟢' : '🔴'
		}
		
	}
}
