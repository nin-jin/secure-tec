namespace $.$$ {
	export class $tec_vendor_license extends $.$tec_vendor_license {

		@ $mol_mem
		domain_id(val?: string) {
			if ( val !== undefined ) return val as string
			return $tec_domain.id
		}

		@$mol_action
		bundle_license() {
			const land = this.vendor().land
			const dict = this.vendor()

			this.vendor().expires(
				this.domain_id()
			).numb(
				this.Date().value_moment().native.getTime()
			)

			$tec_vendor_bundler.pack(land, dict)
		}
	}
}
