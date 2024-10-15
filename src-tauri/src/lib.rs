// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn login(username: &str, password: &str) -> bool {
    if username == "admin" && password == "1" {
        println!("Hello admin");
        true
    } else {
        false
    }
}

#[tauri::command]
fn get_system_info() -> String {
    let mut info = String::new();

    match sys_info::cpu_num() {
        Ok(cpu_num) => {
            let message = format!("Số lõi CPU: {}\n", cpu_num);
            println!("{}", message);
            info.push_str(&message);
        },
        Err(e) => {
            let message = format!("Không thể lấy thông tin số lõi CPU: {}\n", e);
            println!("{}", message);
            info.push_str(&message);
        },
    }

    match sys_info::cpu_speed() {
        Ok(cpu_speed) => {
            let message = format!("Tốc độ CPU: {} MHz\n", cpu_speed);
            println!("{}", message);
            info.push_str(&message);
        },
        Err(e) => {
            let message = format!("Không thể lấy thông tin tốc độ CPU: {}\n", e);
            println!("{}", message);
            info.push_str(&message);
        },
    }

    // Lấy thông tin bộ nhớ
    match sys_info::mem_info() {
        Ok(mem) => {
            let total_mem = format!("Bộ nhớ: {} MB\n", mem.total / 1024);
            let free_mem = format!("Sử dụng: {} MB\n", mem.free / 1024);
            println!("{}{}", total_mem, free_mem);
            info.push_str(&total_mem);
            info.push_str(&free_mem);
        },
        Err(e) => {
            let message = format!("Không thể lấy thông tin bộ nhớ: {}\n", e);
            println!("{}", message);
            info.push_str(&message);
        },
    }

    // Lấy thông tin phiên bản OS
    match sys_info::os_release() {
        Ok(os) => {
            let message = format!("Hệ điều hành: {}\n", os);
            println!("{}", message);
            info.push_str(&message);
        },
        Err(e) => {
            let message = format!("Không thể lấy thông tin hệ điều hành: {}\n", e);
            println!("{}", message);
            info.push_str(&message);
        },
    }

    // Lấy thông tin tên máy
    match sys_info::hostname() {
        Ok(host) => {
            let message = format!("Tên máy: {}\n", host);
            println!("{}", message);
            info.push_str(&message);
        },
        Err(e) => {
            let message = format!("Không thể lấy thông tin tên máy: {}\n", e);
            println!("{}", message);
            info.push_str(&message);
        },
    }

    info
}
#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_notification::init())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![greet, login, get_system_info])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
