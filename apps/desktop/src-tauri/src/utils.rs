use symphonia::core::formats::FormatOptions;
use symphonia::core::io::MediaSourceStream;
use symphonia::core::meta::MetadataOptions;
use symphonia::core::probe::Hint;

use tauri::command;

use std::fs::File;

#[command]
pub async fn get_audio_duration(file_path: String) -> u32 {
    let file = match File::open(&file_path) {
        Ok(f) => f,
        Err(_) => return 0,
    };

    let mss = MediaSourceStream::new(Box::new(file), Default::default());
    let hint = Hint::new();

    let probed = match symphonia::default::get_probe()
        .format(&hint, mss, &FormatOptions::default(), &MetadataOptions::default()) {
        Ok(p) => p,
        Err(_) => return 0,
    };

    let format = probed.format;
    
    let track = match format.tracks().iter().find(|t| t.codec_params.sample_rate.is_some()) {
        Some(t) => t,
        None => return 0,
    };

    if let (Some(n_frames), Some(tb)) = (track.codec_params.n_frames, track.codec_params.time_base) {
        let time = tb.calc_time(n_frames);
        let total_seconds = time.seconds as f64 + time.frac;
        total_seconds.round() as u32
    } else {
        0
    }
}