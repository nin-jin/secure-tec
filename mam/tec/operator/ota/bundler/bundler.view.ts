namespace $.$$ {
	export class $tec_operator_ota_bundler extends $.$tec_operator_ota_bundler {

		@$mol_action
		upload(files: File[]) {
			const land = this.yard().land_grab();
			const dict = land.node("0_0", $hyoo_crowd_dict)

			for (const file of files) {
				dict.sub(file.name, $hyoo_crowd_blob).blob(
					file
				)
			}

			const blob = new $mol_blob([$mol_wire_sync(land.world()!).delta_batch(land)])
			const path_name = `${land!.id()}!${dict.head}.bin`

			const link = document.createElement('a')
			link.setAttribute('href', URL.createObjectURL(blob))
			link.setAttribute('download', path_name)
			link.style.display = 'none'
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
		}

		download_name(land: $hyoo_crowd_land, head: $mol_int62_string) {
			return `${land!.id()}!${head}.bin`
		}

	}
}
